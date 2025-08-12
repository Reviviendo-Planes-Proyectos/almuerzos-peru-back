// paginate.spec.ts
import { Repository } from 'typeorm';
import { paginate } from '../pagination';

describe('paginate', () => {
  let repo: jest.Mocked<Repository<any>>;

  beforeEach(() => {
    repo = {
      findAndCount: jest.fn()
    } as unknown as jest.Mocked<Repository<any>>;
  });

  it('debería paginar correctamente con valores por defecto', async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    repo.findAndCount.mockResolvedValue([mockData, 15]);

    const result = await paginate(repo, 1, 10);

    expect(repo.findAndCount).toHaveBeenCalledWith({
      skip: 0,
      take: 10
    });
    expect(result).toEqual({
      data: mockData,
      paginationData: {
        total: 15,
        currentPage: 1,
        lastPage: 2,
        nextPage: 2,
        perPage: 10
      }
    });
  });

  it('debería calcular bien el skip y nextPage', async () => {
    const mockData = [{ id: 3 }, { id: 4 }];
    repo.findAndCount.mockResolvedValue([mockData, 25]);

    const result = await paginate(repo, 2, 5);

    expect(repo.findAndCount).toHaveBeenCalledWith({
      skip: 5,
      take: 5
    });
    expect(result.paginationData.currentPage).toBe(2);
    expect(result.paginationData.nextPage).toBe(3);
  });

  it('debería devolver nextPage como null si es la última página', async () => {
    const mockData = [{ id: 5 }];
    repo.findAndCount.mockResolvedValue([mockData, 6]);

    const result = await paginate(repo, 2, 3);

    expect(result.paginationData.lastPage).toBe(2);
    expect(result.paginationData.nextPage).toBeNull();
  });

  it('debería aceptar opciones adicionales de TypeORM', async () => {
    const mockData = [{ id: 1 }];
    repo.findAndCount.mockResolvedValue([mockData, 1]);

    const options = { where: { name: 'Test' }, order: { id: 'DESC' } };
    await paginate(repo, 1, 10, options);

    expect(repo.findAndCount).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      ...options
    });
  });
});
