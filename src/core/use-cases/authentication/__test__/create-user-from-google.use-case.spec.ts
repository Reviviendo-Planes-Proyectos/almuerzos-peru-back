import { Test, TestingModule } from '@nestjs/testing';
import CreateUserFromGoogleUseCase from '../create-user-from-google.use-case'; // ajusta la ruta si difiere
import { IUser, User } from '../../../domain/repositories/authentication/user.entity';

describe('CreateUserFromGoogleUseCase', () => {
  let useCase: CreateUserFromGoogleUseCase;

  const mockGoogleAuthRepository = {
    decodedUserFromGoogle: jest.fn(),
    findUserBySub: jest.fn(),
    saveUser: jest.fn(),
    generateJWT: jest.fn()
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
          provide: CreateUserFromGoogleUseCase,
          useFactory: (repo: typeof mockGoogleAuthRepository) => new CreateUserFromGoogleUseCase(repo as any),
          inject: ['IGoogleAuthRepository']
        },
        {
          provide: 'IGoogleAuthRepository',
          useValue: mockGoogleAuthRepository
        }
      ]
    }).compile();

    useCase = module.get<CreateUserFromGoogleUseCase>(CreateUserFromGoogleUseCase);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const token = 'valid-google-id-token';

    const decodedGoogleUser = {
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
        sub: decodedGoogleUser.sub,
        email: decodedGoogleUser.email,
        username: decodedGoogleUser.username,
        providerId: decodedGoogleUser.providerId,
        imageUrl: decodedGoogleUser.imageUrl,
        emailVerified: decodedGoogleUser.emailVerified
      });

      mockGoogleAuthRepository.decodedUserFromGoogle.mockResolvedValue(decodedGoogleUser);
      mockGoogleAuthRepository.findUserBySub.mockResolvedValue(existingUser);
      mockGoogleAuthRepository.generateJWT.mockReturnValue('jwt-token-existing');

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

      // Verificaciones de interacción
      expect(mockGoogleAuthRepository.decodedUserFromGoogle).toHaveBeenCalledTimes(1);
      expect(mockGoogleAuthRepository.decodedUserFromGoogle).toHaveBeenCalledWith(token);

      expect(mockGoogleAuthRepository.findUserBySub).toHaveBeenCalledTimes(1);
      expect(mockGoogleAuthRepository.findUserBySub).toHaveBeenCalledWith(decodedGoogleUser.sub);

      expect(mockGoogleAuthRepository.saveUser).not.toHaveBeenCalled();

      expect(mockGoogleAuthRepository.generateJWT).toHaveBeenCalledTimes(1);
      expect(mockGoogleAuthRepository.generateJWT).toHaveBeenCalledWith(existingUser);
    });

    it('should create user when not found, then return token and created user', async () => {
      const createdUser = buildUser({
        id: 11,
        sub: decodedGoogleUser.sub,
        email: decodedGoogleUser.email,
        username: decodedGoogleUser.username,
        providerId: decodedGoogleUser.providerId,
        imageUrl: decodedGoogleUser.imageUrl,
        emailVerified: decodedGoogleUser.emailVerified
      });
      const domainUserToPersist = {
        username: decodedGoogleUser.username,
        email: decodedGoogleUser.email,
        sub: decodedGoogleUser.sub,
        emailVerified: decodedGoogleUser.emailVerified,
        providerId: decodedGoogleUser.providerId,
        imageUrl: decodedGoogleUser.imageUrl
      } as any;

      const createSpy = jest.spyOn(User, 'create').mockReturnValue(domainUserToPersist);

      mockGoogleAuthRepository.decodedUserFromGoogle.mockResolvedValue(decodedGoogleUser);
      mockGoogleAuthRepository.findUserBySub.mockResolvedValue(null);

      // 3) El repositorio devuelve el usuario creado/persistido
      mockGoogleAuthRepository.saveUser.mockResolvedValue(createdUser);

      mockGoogleAuthRepository.generateJWT.mockReturnValue('jwt-token-created');

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

      expect(mockGoogleAuthRepository.decodedUserFromGoogle).toHaveBeenCalledTimes(1);
      expect(mockGoogleAuthRepository.decodedUserFromGoogle).toHaveBeenCalledWith(token);

      expect(mockGoogleAuthRepository.findUserBySub).toHaveBeenCalledTimes(1);
      expect(mockGoogleAuthRepository.findUserBySub).toHaveBeenCalledWith(decodedGoogleUser.sub);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(decodedGoogleUser);

      expect(mockGoogleAuthRepository.saveUser).toHaveBeenCalledTimes(1);
      expect(mockGoogleAuthRepository.saveUser).toHaveBeenCalledWith(domainUserToPersist);

      expect(mockGoogleAuthRepository.generateJWT).toHaveBeenCalledTimes(1);
      expect(mockGoogleAuthRepository.generateJWT).toHaveBeenCalledWith(createdUser);

      createSpy.mockRestore();
    });
  });
});
