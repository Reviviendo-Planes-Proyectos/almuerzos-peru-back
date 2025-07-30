import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmAuthenticationFromGoogle } from '../typeorm-auth-from-google.repository';
import { UserEntity } from '../../user.entity';
import { IUser } from '../../../../../../core/domain/repositories/authentication/user.entity';
import { FirebaseService } from '../../../../../../common/firebase/firebase.service';

describe('TypeOrmAuthenticationFromGoogle', () => {
  let repo: TypeOrmAuthenticationFromGoogle;

  let mockRepo: jest.Mocked<Repository<UserEntity>>;
  let mockFirebase: { verifyToken: jest.Mock };
  let mockJwt: { sign: jest.Mock };

  beforeEach(async () => {
    mockFirebase = {
      verifyToken: jest.fn()
    };

    mockJwt = {
      sign: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmAuthenticationFromGoogle,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            findOneBy: jest.fn()
          }
        },
        { provide: FirebaseService, useValue: mockFirebase },
        { provide: JwtService, useValue: mockJwt }
      ]
    }).compile();

    repo = module.get(TypeOrmAuthenticationFromGoogle);
    mockRepo = module.get(getRepositoryToken(UserEntity));
  });

  describe('decodedUserFromGoogle', () => {
    it('debe mapear correctamente el usuario desde el token decodificado', async () => {
      const token = 'fake-google-id-token';
      const decoded = {
        name: 'John Doe',
        email: 'john@example.com',
        sub: 'google-oauth2|1234567890',
        email_verified: true,
        firebase: { sign_in_provider: 'google.com' },
        picture: 'https://example.com/avatar.png'
      };

      mockFirebase.verifyToken.mockResolvedValue(decoded);

      const result = await repo.decodedUserFromGoogle(token);

      expect(mockFirebase.verifyToken).toHaveBeenCalledWith(token);
      expect(result).toEqual({
        username: decoded.name,
        email: decoded.email,
        sub: decoded.sub,
        emailVerified: decoded.email_verified,
        providerId: decoded.firebase.sign_in_provider,
        imageUrl: decoded.picture
      });
    });

    it('debe propagar el error si verifyToken falla', async () => {
      const token = 'bad-token';
      const error = new Error('invalid token');
      mockFirebase.verifyToken.mockRejectedValue(error);

      await expect(repo.decodedUserFromGoogle(token)).rejects.toThrow(error);
      expect(mockFirebase.verifyToken).toHaveBeenCalledWith(token);
    });
  });

  describe('saveUser', () => {
    it('debe guardar y devolver el usuario', async () => {
      const input: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> = {
        username: 'John Doe',
        email: 'john@example.com',
        sub: 'google-oauth2|1234567890',
        emailVerified: true,
        providerId: 'google.com',
        imageUrl: 'https://example.com/avatar.png'
      };

      const saved: IUser = {
        id: 1,
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date('2025-01-01T00:00:00Z'),
        ...input
      };

      (mockRepo.save as jest.Mock).mockResolvedValue(saved);

      const result = await repo.saveUser(input);

      expect(mockRepo.save).toHaveBeenCalledWith(input);
      expect(result).toEqual(saved);
    });
  });

  describe('findUserBySub', () => {
    it('debe devolver el usuario si existe', async () => {
      const sub = 'google-oauth2|1234567890';
      const found: IUser = {
        id: 1,
        username: 'John Doe',
        email: 'john@example.com',
        sub,
        emailVerified: true,
        providerId: 'google.com',
        imageUrl: 'https://example.com/avatar.png',
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date('2025-01-01T00:00:00Z')
      };

      (mockRepo.findOneBy as jest.Mock).mockResolvedValue(found);

      const result = await repo.findUserBySub(sub);

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ sub });
      expect(result).toEqual(found);
    });

    it('debe devolver null si no existe', async () => {
      const sub = 'google-oauth2|not-found';
      (mockRepo.findOneBy as jest.Mock).mockResolvedValue(null);

      const result = await repo.findUserBySub(sub);

      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ sub });
      expect(result).toBeNull();
    });
  });

  describe('generateJWT', () => {
    it('debe firmar el payload correcto y devolver el token', () => {
      const user: IUser = {
        id: 1,
        username: 'John Doe',
        email: 'john@example.com',
        sub: 'google-oauth2|1234567890',
        emailVerified: true,
        providerId: 'google.com',
        imageUrl: 'https://example.com/avatar.png',
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date('2025-01-01T00:00:00Z')
      };

      mockJwt.sign.mockReturnValue('jwt-token');

      const token = repo.generateJWT(user);

      expect(mockJwt.sign).toHaveBeenCalledWith({
        sub: user.sub,
        email: user.email,
        username: user.username
      });
      expect(token).toBe('jwt-token');
    });
  });
});
