import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmUserRepository } from '../typeorm-user.repository';
import { UserEntity } from '../../../core/domain/repositories/user/user.entity';

describe('TypeOrmUserRepository', () => {
  let repo: TypeOrmUserRepository;
  let mockRepo: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmUserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn()
          }
        }
      ]
    }).compile();

    repo = module.get(TypeOrmUserRepository);
    mockRepo = module.get(getRepositoryToken(UserEntity));
  });

  it('should find all users', async () => {
    const users = [{ id: 1, name: 'Test' }] as any;
    mockRepo.find.mockResolvedValue(users);
    expect(await repo.findAll()).toEqual(users);
  });

  it('should find user by id', async () => {
    const user = { id: 1 } as any;
    mockRepo.findOne.mockResolvedValue(user);
    expect(await repo.findById(1)).toEqual(user);
  });

  it('should return null if user not found by id', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    expect(await repo.findById(999)).toBeNull();
  });

  it('should find user by email', async () => {
    const user = { id: 1, email: 'a@test.com' } as any;
    mockRepo.findOne.mockResolvedValue(user);
    expect(await repo.findByEmail('a@test.com')).toEqual(user);
  });

  it('should return null if user not found by email', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    expect(await repo.findByEmail('notfound@test.com')).toBeNull();
  });

  it('should update a user and return it', async () => {
    const updated = { id: 1, name: 'Updated' } as any;
    mockRepo.update.mockResolvedValue(undefined);
    mockRepo.findOne.mockResolvedValue(updated);

    const result = await repo.update(1, { name: 'Updated' });
    expect(result).toEqual(updated);
  });

  it('should delete a user', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await repo.delete(1);
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });

  it('should return true if user exists', async () => {
    mockRepo.count.mockResolvedValue(1);
    expect(await repo.exists(1)).toBe(true);
  });

  it('should return false if user does not exist', async () => {
    mockRepo.count.mockResolvedValue(0);
    expect(await repo.exists(999)).toBe(false);
  });
});
