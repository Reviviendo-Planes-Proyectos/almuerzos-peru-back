import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersUseCase } from '../get-all-users.use-case';
import { IUser } from '../../../domain/repositories/authentication/user.entity';
import { IFirebaseAuthRepository } from '../../../../core/domain/repositories/authentication/firebase-auth.repository.interface';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;

  const mockFirebaseAuthRepository = {
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
      profilePicture: 'https://example.com/alice.jpg',
      dni: '12345678',
      firstName: 'Alice',
      lastName: 'Smith',
      phone: '987654321',
      district: 'Miraflores',
      province: 'Lima',
      description: 'Usuaria activa',
      role: 'consumer',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteAt: null
    },
    {
      id: 2,
      username: 'bob',
      email: 'bob@example.com',
      sub: 'google-oauth2|2222',
      emailVerified: true,
      providerId: 'google',
      profilePicture: null,
      dni: '87654321',
      firstName: 'Bob',
      lastName: 'Johnson',
      phone: '912345678',
      district: 'San Isidro',
      province: 'Lima',
      description: null,
      role: 'admin',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteAt: null
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GetAllUsersUseCase,
          useFactory: (repo: IFirebaseAuthRepository) => new GetAllUsersUseCase(repo),
          inject: ['IFirebaseAuthRepository']
        },
        {
          provide: 'IFirebaseAuthRepository',
          useValue: mockFirebaseAuthRepository
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
      mockFirebaseAuthRepository.getAllUsers.mockResolvedValue(usersMock);

      const result = await useCase.execute();

      expect(result).toEqual([
        {
          username: 'alice',
          email: 'alice@example.com',
          providerId: 'google',
          profilePicture: 'https://example.com/alice.jpg'
        },
        {
          username: 'bob',
          email: 'bob@example.com',
          providerId: 'google',
          profilePicture: undefined
        }
      ]);

      expect(mockFirebaseAuthRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when there are no users', async () => {
      mockFirebaseAuthRepository.getAllUsers.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(mockFirebaseAuthRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });
  });
});
