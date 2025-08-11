import { Repository, SelectQueryBuilder } from 'typeorm';
import { paginateWithFilters } from '../pagination-with-filters';
import { SearchParams } from '../../../../core/domain/dto/search/search-param';

function createQueryBuilderMock<T>() {
  const qb: Partial<SelectQueryBuilder<T>> = {
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([[{ id: 1, name: 'Test' }], 1])
  };
  return qb as SelectQueryBuilder<T>;
}

describe('paginateWithFilters', () => {
  let repositoryMock: Partial<Repository<any>>;
  let qbMock: SelectQueryBuilder<any>;

  beforeEach(() => {
    qbMock = createQueryBuilderMock();
    repositoryMock = {
      metadata: { tableName: 'users' } as any,
      createQueryBuilder: jest.fn().mockReturnValue(qbMock)
    };
  });

  it('debería paginar con select, where like y order básico', async () => {
    const searchParams: SearchParams = {
      page: 1,
      limit: 10,
      select: ['id', 'name'],
      where: { name: { op: 'like', value: 'Test' } },
      order: { id: 'ASC' }
    };

    const result = await paginateWithFilters(repositoryMock as Repository<any>, searchParams);

    expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith('users');
    expect(qbMock.select).toHaveBeenCalledWith(['users.id', 'users.name']);
    expect(qbMock.andWhere).toHaveBeenCalledWith('users.name LIKE :name', { name: '%Test%' });
    expect(qbMock.addOrderBy).toHaveBeenCalledWith('users.id', 'ASC');
    expect(result.paginationData.total).toBe(1);
  });

  it('debería soportar relations con campos seleccionados', async () => {
    const searchParams: SearchParams = {
      page: 1,
      limit: 5,
      relations: { profile: ['age', 'country'] }
    };

    await paginateWithFilters(repositoryMock as Repository<any>, searchParams);

    expect(qbMock.leftJoin).toHaveBeenCalledWith('users.profile', 'profile');
    expect(qbMock.addSelect).toHaveBeenCalledWith('profile.age');
    expect(qbMock.addSelect).toHaveBeenCalledWith('profile.country');
  });

  it('debería soportar where simple sin operador', async () => {
    const searchParams: SearchParams = {
      page: 1,
      limit: 5,
      where: { isActive: true }
    };

    await paginateWithFilters(repositoryMock as Repository<any>, searchParams);

    expect(qbMock.andWhere).toHaveBeenCalledWith('users.isActive = :isActive', { isActive: true });
  });

  it('debería soportar where anidado con operador gte', async () => {
    const searchParams = {
      page: 1,
      limit: 5,
      where: {
        profile: {
          age: { op: 'gte', value: 18 }
        }
      }
    } as unknown as SearchParams;

    await paginateWithFilters(repositoryMock as Repository<any>, searchParams);

    expect(qbMock.andWhere).toHaveBeenCalledWith('profile.age >= :profile_age', { profile_age: 18 });
  });

  it('debería soportar order en relación', async () => {
    const searchParams: SearchParams = {
      page: 1,
      limit: 5,
      order: { 'profile.age': 'DESC' }
    };

    await paginateWithFilters(repositoryMock as Repository<any>, searchParams);

    expect(qbMock.addOrderBy).toHaveBeenCalledWith('profile.age', 'DESC');
  });

  it('debería paginar sin select ni order ni where', async () => {
    const searchParams: SearchParams = {
      page: 2,
      limit: 1
    };

    await paginateWithFilters(repositoryMock as Repository<any>, searchParams);

    expect(qbMock.skip).toHaveBeenCalledWith(1);
    expect(qbMock.take).toHaveBeenCalledWith(1);
  });
});
