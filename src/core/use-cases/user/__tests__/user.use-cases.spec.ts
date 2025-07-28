import { Test, TestingModule } from '@nestjs/testing';
import { UserUseCases } from '../user.use-cases';
import { User } from '../../../../infrastructure/database/entities/user/user';

describe('UserUseCases', () => {
  let usersUseCases: UserUseCases;

  const mockUserRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUseCases,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository
        }
      ]
    }).compile();

    usersUseCases = module.get<UserUseCases>(UserUseCases);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        User.create({ email: 'test1@example.com', name: 'Test User 1' }),
        User.create({ email: 'test2@example.com', name: 'Test User 2' })
      ];
      mockUserRepository.findAll.mockResolvedValue(mockUsers);

      const result = await usersUseCases.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = User.create({
        email: 'test@example.com',
        name: 'Test User'
      });
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await usersUseCases.getUserById(1);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should return null if user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      const result = await usersUseCases.getUserById(999);

      expect(result).toBeNull();
      expect(mockUserRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        phone: '+51987654321'
      };

      const mockUser = User.create({
        email: createUserDto.email,
        name: createUserDto.name,
        phone: createUserDto.phone
      });
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);

      const result = await usersUseCases.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(mockUserRepository.create).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should throw error if email already exists', async () => {
      const createUserDto = {
        email: 'existing@example.com',
        name: 'Test User'
      };

      const existingUser = User.create({
        email: 'existing@example.com',
        name: 'Existing User'
      });
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(usersUseCases.createUser(createUserDto)).rejects.toThrow('Email already exists');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      const updateUserDto = { name: 'Updated Name' };
      const existingUser = User.create({
        email: 'test@example.com',
        name: 'Test User'
      });
      const updatedUser = User.create({
        email: 'test@example.com',
        name: 'Updated Name'
      });

      mockUserRepository.findById.mockResolvedValue(existingUser);
      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await usersUseCases.updateUser(1, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
      expect(mockUserRepository.update).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('should return null if user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      const result = await usersUseCases.updateUser(999, { name: 'Updated' });

      expect(result).toBeNull();
      expect(mockUserRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      const existingUser = User.create({
        email: 'test@example.com',
        name: 'Test User'
      });
      mockUserRepository.findById.mockResolvedValue(existingUser);
      mockUserRepository.delete.mockResolvedValue(undefined);

      await usersUseCases.deleteUser(1);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(usersUseCases.deleteUser(999)).rejects.toThrow('User not found');
      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });
});
