import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../../infrastructure/database/entities/authentication/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserServiceCommon } from '../user.service';

describe('UserServiceCommon', () => {
  let service: UserServiceCommon;

  const mockUserRepository = {
    findOne: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserServiceCommon,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository
        }
      ]
    }).compile();

    service = module.get<UserServiceCommon>(UserServiceCommon);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('userExistBySub', () => {
    it('should return true if user exists by sub', async () => {
      const fakeUser = { id: 1, sub: 'abc123' } as UserEntity;
      mockUserRepository.findOne.mockResolvedValue(fakeUser);

      const result = await service.userExistBySub('abc123');

      expect(result).toBe(true);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { sub: 'abc123' } });
    });

    it('should return false if user does not exist by sub', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.userExistBySub('nonexistent');

      expect(result).toBe(false);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { sub: 'nonexistent' } });
    });
  });

  describe('findRoleByUserSub', () => {
    it('should return role if user exists', async () => {
      const fakeUser = { id: 1, sub: 'abc123', role: 'admin' } as UserEntity;
      mockUserRepository.findOne.mockResolvedValue(fakeUser);

      const result = await service.findRoleByUserSub('abc123');

      expect(result).toBe('admin');
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { sub: 'abc123' } });
    });

    it('should return null if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.findRoleByUserSub('nonexistent');

      expect(result).toBeNull();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { sub: 'nonexistent' } });
    });
  });
});
