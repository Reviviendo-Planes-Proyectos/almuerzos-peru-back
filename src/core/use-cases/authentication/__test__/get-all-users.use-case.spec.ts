import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersUseCase } from '../get-all-users.use-case';
import { IGoogleAuthRepository } from 'src/core/domain/repositories/authentication/google-auth.repository.interface';
import { IUser } from 'src/core/domain/repositories/authentication/user.entity';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;

  const mockGoogleAuthRepository = {
    getAllUsers: jest.fn()
  };

  const usersMock: IUser[] = [
    {
      id: 1,
      username: 'alice',
      email: 'alice@example.com',
      sub: 'google-oauth2|1111',
      emailVerified: true,
      providerId: 'google',
      imageUrl: 'https://example.com/alice.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      username: 'bob',
      email: 'bob@example.com',
      sub: 'google-oauth2|2222',
      emailVerified: true,
      providerId: 'google',
      imageUrl: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GetAllUsersUseCase,
          useFactory: (repo: IGoogleAuthRepository) => new GetAllUsersUseCase(repo),
          inject: ['IGoogleAuthRepository']
        },
        {
          provide: 'IGoogleAuthRepository',
          useValue: mockGoogleAuthRepository
        }
      ]
    }).compile();

    useCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return a list of users formatted as AuthUserDto[]', async () => {
      mockGoogleAuthRepository.getAllUsers.mockResolvedValue(usersMock);

      const result = await useCase.execute();

      expect(result).toEqual([
        {
          username: 'alice',
          email: 'alice@example.com',
          providerId: 'google',
          imageUrl: 'https://example.com/alice.jpg'
        },
        {
          username: 'bob',
          email: 'bob@example.com',
          providerId: 'google',
          imageUrl: undefined
        }
      ]);

      expect(mockGoogleAuthRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when there are no users', async () => {
      mockGoogleAuthRepository.getAllUsers.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(mockGoogleAuthRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });
  });
});
