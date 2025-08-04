import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from 'src/core/domain/dto/user/user.profile.dto';
import { TypeOrmUserProfile } from '../typeorm-user-profile.repository';
import { UserEntity } from '../../../authentication/user.entity';

describe('TypeOrmUserProfile', () => {
  let service: TypeOrmUserProfile;
  let mockRepo: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      update: jest.fn(),
      findOneBy: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmUserProfile,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository
        }
      ]
    }).compile();

    service = module.get(TypeOrmUserProfile);
    mockRepo = module.get(getRepositoryToken(UserEntity));
  });

  describe('registerInfoUser', () => {
    it('debe actualizar y retornar el usuario actualizado', async () => {
      const sub = 'google-oauth2|1234567890';

      const input: UserProfile = {
        dni: '12345678',
        firstName: 'John',
        lastName: 'Doe',
        phone: '987654321',
        district: 'Lima',
        province: 'Lima',
        role: 'consumer',
        description: 'Usuario de prueba',
        imageUrl: 'https://example.com/avatar.png'
      };

      const updatedUser: UserEntity = {
        id: 1,
        sub,
        email: 'john@example.com',
        username: 'John Doe',
        emailVerified: true,
        providerId: 'google.com',
        isDeleted: false,
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date('2025-01-01T00:00:00Z'),
        deleteAt: new Date('2100-01-01T00:00:00Z'),
        dni: '12345678',
        firstName: 'John',
        lastName: 'Doe',
        phone: '987654321',
        district: 'Lima',
        province: 'Lima',
        role: 'consumer',
        imageUrl: 'https://example.com/avatar.png',
        description: 'Usuario de prueba'
      };

      mockRepo.update.mockResolvedValue(undefined);
      mockRepo.findOneBy.mockResolvedValue(updatedUser);

      const result = await service.registerInfoUser(sub, input);

      expect(mockRepo.update).toHaveBeenCalledWith({ sub }, input);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ sub });
      expect(result).toEqual(updatedUser);
    });

    it('debe retornar null si no se encuentra el usuario después del update', async () => {
      const sub = 'google-oauth2|not-found';

      const input: UserProfile = {
        dni: '00000000',
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '000000000',
        district: 'Unknown',
        province: 'Unknown',
        role: 'consumer'
      };

      mockRepo.update.mockResolvedValue(undefined);
      mockRepo.findOneBy.mockResolvedValue(null);

      const result = await service.registerInfoUser(sub, input);

      expect(mockRepo.update).toHaveBeenCalledWith({ sub }, input);
      expect(result).toBeNull();
    });
  });
});
