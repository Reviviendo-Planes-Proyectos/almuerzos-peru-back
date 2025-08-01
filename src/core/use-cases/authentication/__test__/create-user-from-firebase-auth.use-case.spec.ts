import { Test, TestingModule } from '@nestjs/testing';
import { IUser, User } from '../../../domain/repositories/authentication/user.entity';
import { CreateUserFromFirebaseAuthUseCase } from '../create-user-from-firebase-auth.use-case';

describe('CreateUserFromFirebaseAuthUseCase', () => {
  let useCase: CreateUserFromFirebaseAuthUseCase;

  const mockFirebaseAuthRepository = {
    decodedUserFromFirebase: jest.fn(),
    findUserBySub: jest.fn(),
    saveUser: jest.fn(),
    generateJWT: jest.fn(),
    getAllUsers: jest.fn()
  };

  const buildUser = (overrides?: Partial<IUser>): IUser => {
    const base = User.create({
      username: 'john_doe',
      email: 'john@example.com',
      sub: 'google-oauth2|12345',
      emailVerified: true,
      providerId: 'google',
      imageUrl: 'https://example.com/avatar.png'
    });
    const now = new Date();
    return {
      id: 1,
      createdAt: now,
      updatedAt: now,
      ...base,
      ...overrides
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CreateUserFromFirebaseAuthUseCase,
          useFactory: (repo: typeof mockFirebaseAuthRepository) => new CreateUserFromFirebaseAuthUseCase(repo as any),
          inject: ['IFirebaseAuthRepository']
        },
        {
          provide: 'IFirebaseAuthRepository',
          useValue: mockFirebaseAuthRepository
        }
      ]
    }).compile();

    useCase = module.get<CreateUserFromFirebaseAuthUseCase>(CreateUserFromFirebaseAuthUseCase);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const token = 'valid-google-id-token';

    const decodedFirebaseUser = {
      username: 'john_doe',
      email: 'john@example.com',
      sub: 'google-oauth2|12345',
      emailVerified: true,
      providerId: 'google',
      imageUrl: 'https://example.com/avatar.png'
    };

    it('should return token and existing user without creating a new one', async () => {
      const existingUser = buildUser({
        id: 10,
        sub: decodedFirebaseUser.sub,
        email: decodedFirebaseUser.email,
        username: decodedFirebaseUser.username,
        providerId: decodedFirebaseUser.providerId,
        imageUrl: decodedFirebaseUser.imageUrl,
        emailVerified: decodedFirebaseUser.emailVerified
      });

      mockFirebaseAuthRepository.decodedUserFromFirebase.mockResolvedValue(decodedFirebaseUser);
      mockFirebaseAuthRepository.findUserBySub.mockResolvedValue(existingUser);
      mockFirebaseAuthRepository.generateJWT.mockReturnValue('jwt-token-existing');

      const result = await useCase.execute(token);

      expect(result).toEqual({
        token: 'jwt-token-existing',
        user: {
          username: existingUser.username,
          email: existingUser.email,
          providerId: existingUser.providerId,
          imageUrl: existingUser.imageUrl
        }
      });

      expect(mockFirebaseAuthRepository.decodedUserFromFirebase).toHaveBeenCalledTimes(1);
      expect(mockFirebaseAuthRepository.decodedUserFromFirebase).toHaveBeenCalledWith(token);

      expect(mockFirebaseAuthRepository.findUserBySub).toHaveBeenCalledTimes(1);
      expect(mockFirebaseAuthRepository.findUserBySub).toHaveBeenCalledWith(decodedFirebaseUser.sub);

      expect(mockFirebaseAuthRepository.saveUser).not.toHaveBeenCalled();
      expect(mockFirebaseAuthRepository.generateJWT).toHaveBeenCalledWith(existingUser);
    });

    it('should create user when not found, then return token and created user', async () => {
      const createdUser = buildUser({
        id: 11,
        sub: decodedFirebaseUser.sub,
        email: decodedFirebaseUser.email,
        username: decodedFirebaseUser.username,
        providerId: decodedFirebaseUser.providerId,
        imageUrl: decodedFirebaseUser.imageUrl,
        emailVerified: decodedFirebaseUser.emailVerified
      });

      const domainUserToPersist = {
        username: decodedFirebaseUser.username,
        email: decodedFirebaseUser.email,
        sub: decodedFirebaseUser.sub,
        emailVerified: decodedFirebaseUser.emailVerified,
        providerId: decodedFirebaseUser.providerId,
        imageUrl: decodedFirebaseUser.imageUrl
      } as any;

      const createSpy = jest.spyOn(User, 'create').mockReturnValue(domainUserToPersist);

      mockFirebaseAuthRepository.decodedUserFromFirebase.mockResolvedValue(decodedFirebaseUser);
      mockFirebaseAuthRepository.findUserBySub.mockResolvedValue(null);
      mockFirebaseAuthRepository.saveUser.mockResolvedValue(createdUser);
      mockFirebaseAuthRepository.generateJWT.mockReturnValue('jwt-token-created');

      const result = await useCase.execute(token);

      expect(result).toEqual({
        token: 'jwt-token-created',
        user: {
          username: createdUser.username,
          email: createdUser.email,
          providerId: createdUser.providerId,
          imageUrl: createdUser.imageUrl
        }
      });

      expect(mockFirebaseAuthRepository.decodedUserFromFirebase).toHaveBeenCalledWith(token);
      expect(mockFirebaseAuthRepository.findUserBySub).toHaveBeenCalledWith(decodedFirebaseUser.sub);
      expect(createSpy).toHaveBeenCalledWith(decodedFirebaseUser);
      expect(mockFirebaseAuthRepository.saveUser).toHaveBeenCalledWith(domainUserToPersist);
      expect(mockFirebaseAuthRepository.generateJWT).toHaveBeenCalledWith(createdUser);

      createSpy.mockRestore();
    });
  });
});
