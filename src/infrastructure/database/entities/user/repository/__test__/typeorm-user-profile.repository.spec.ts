import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { TypeOrmUserProfile } from '../typeorm-user-profile.repository';
import { UserEntity } from '../../../authentication/user.entity';
import { ConsumerEntity } from '../../../consumer/consumer.entity';
import { AdminEntity } from '../../../admin/admin.entity';
import { RestaurantEntity } from '../../../restaurant/restaurant.entity';
import { OpeningHourEntity } from '../../../opening-hour/openings-hours.entity';
import { UserProfileDTO } from '../../../../../../core/domain/dto/user/user-profile.dto';

describe('TypeOrmUserProfile', () => {
  let service: TypeOrmUserProfile;
  let mockRepo: jest.Mocked<Repository<UserEntity>>;
  let mockManager: jest.Mocked<EntityManager>;

  beforeEach(async () => {
    mockManager = {
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn()
    } as any;

    const mockRepository = {
      manager: {
        transaction: jest.fn().mockImplementation(async (callback) => {
          return await callback(mockManager);
        })
      }
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
    const sub = 'google-oauth2|1234567890';
    const baseUser: UserEntity = {
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
      dni: null,
      firstName: null,
      lastName: null,
      phone: null,
      district: null,
      province: null,
      role: null,
      description: null
    };

    it('debe registrar un usuario consumer correctamente', async () => {
      const input: UserProfileDTO = {
        dni: '12345678',
        firstName: 'John',
        lastName: 'Doe',
        phone: '987654321',
        district: 'Lima',
        province: 'Lima',
        role: 'consumer',
        description: 'Usuario consumidor'
      };

      const updatedUser: UserEntity = {
        ...baseUser,
        dni: input.dni,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        district: input.district,
        province: input.province,
        role: input.role,
        description: input.description,
        consumer: {
          id: 1,
          user: baseUser,
          userName: 'Luis',
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleteAt: new Date()
        }
      };

      const savedConsumer = {
        id: 1,
        user: updatedUser,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deleteAt: new Date()
      };

      // Setup mocks
      mockManager.findOne.mockResolvedValueOnce(baseUser);
      mockManager.save.mockResolvedValueOnce(savedConsumer);
      mockManager.save.mockResolvedValueOnce(updatedUser);
      mockManager.findOne.mockResolvedValueOnce(updatedUser);

      const result = await service.registerInfoUser(sub, input);

      expect(mockRepo.manager.transaction).toHaveBeenCalledTimes(1);
      expect(mockManager.findOne).toHaveBeenCalledWith(UserEntity, { where: { sub } });
      expect(mockManager.save).toHaveBeenCalledWith(
        ConsumerEntity,
        expect.objectContaining({
          user: expect.any(Object),
          userName: 'John Doe'
        })
      );
      expect(mockManager.save).toHaveBeenCalledWith(UserEntity, expect.any(Object));
      expect(mockManager.findOne).toHaveBeenCalledWith(UserEntity, {
        where: { sub },
        relations: ['consumer']
      });
      expect(result).toEqual(updatedUser);
    });

    it('debe registrar un usuario admin correctamente', async () => {
      const input: UserProfileDTO = {
        dni: '87654321',
        firstName: 'Jane',
        lastName: 'Admin',
        phone: '123456789',
        district: 'Callao',
        province: 'Callao',
        role: 'admin',
        description: 'Usuario administrador'
      };

      const updatedUser: UserEntity = {
        ...baseUser,
        dni: input.dni,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        district: input.district,
        province: input.province,
        role: input.role,
        description: input.description,
        admin: {
          id: 1,
          user: baseUser,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date()
        }
      };

      const savedAdmin = {
        id: 1,
        user: updatedUser,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deleteAt: new Date()
      };

      mockManager.findOne.mockResolvedValueOnce(baseUser);
      mockManager.save.mockResolvedValueOnce(savedAdmin);
      mockManager.save.mockResolvedValueOnce(updatedUser);
      mockManager.findOne.mockResolvedValueOnce(updatedUser);

      const result = await service.registerInfoUser(sub, input);

      expect(mockManager.save).toHaveBeenCalledWith(AdminEntity, { user: expect.any(Object) });
      expect(mockManager.findOne).toHaveBeenCalledWith(UserEntity, {
        where: { sub },
        relations: ['admin']
      });
      expect(result).toEqual(updatedUser);
    });

    it('debe registrar un usuario restaurant con horarios correctamente', async () => {
      const input: UserProfileDTO = {
        dni: '11111111',
        firstName: 'Restaurant',
        lastName: 'Owner',
        phone: '555555555',
        district: 'Miraflores',
        province: 'Lima',
        role: 'restaurant',
        description: 'Propietario de restaurante',
        restaurant: {
          name: 'Mi Restaurante',
          mapsAddress: 'Av. Larco 123',
          referentialAddress: 'Al lado del centro comercial',
          latitude: -12.1234,
          longitude: -77.5678,
          ruc: '12345678901',
          legalName: 'Mi Restaurante SAC',
          whatsappOrders: '987654321',
          yapePhone: '987654321',
          logoUrl: 'https://example.com/logo.png',
          bannerUrl: 'https://example.com/banner.png',
          dinerIn: true,
          delivery: true,
          openingHour: [
            {
              weekDay: 1,
              startTime: '09:00',
              endTime: '22:00',
              enabled: true
            },
            {
              weekDay: 2,
              startTime: '09:00',
              endTime: '22:00',
              enabled: true
            }
          ]
        }
      };

      const savedRestaurant: RestaurantEntity = {
        id: 1,
        user: baseUser,
        name: 'Mi Restaurante',
        mapsAddress: 'Av. Larco 123',
        referentialAddress: 'Al lado del centro comercial',
        latitude: -12.1234,
        longitude: -77.5678,
        ruc: '12345678901',
        legalName: 'Mi Restaurante SAC',
        whatsappOrders: '987654321',
        yapePhone: '987654321',
        logoUrl: 'https://example.com/logo.png',
        bannerUrl: 'https://example.com/banner.png',
        dinerIn: true,
        delivery: true,
        averageRating: 0,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deleteAt: new Date(),
        openingHour: []
      };

      const savedOpeningHours = [
        {
          id: 1,
          restaurant: savedRestaurant,
          weekDay: 1,
          startTime: '09:00',
          endTime: '22:00',
          enabled: true,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date()
        },
        {
          id: 2,
          restaurant: savedRestaurant,
          weekDay: 2,
          startTime: '09:00',
          endTime: '22:00',
          enabled: true,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date()
        }
      ];

      const updatedUser: UserEntity = {
        ...baseUser,
        dni: input.dni,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        district: input.district,
        province: input.province,
        role: input.role,
        description: input.description,
        restaurant: { ...savedRestaurant, openingHour: savedOpeningHours }
      };

      mockManager.findOne.mockResolvedValueOnce(baseUser);
      mockManager.save.mockResolvedValueOnce(savedRestaurant);
      mockManager.create.mockImplementation((entity, data) => ({ ...data, id: Math.random() }));
      mockManager.save.mockResolvedValueOnce(savedOpeningHours);
      mockManager.save.mockResolvedValueOnce(updatedUser);
      mockManager.findOne.mockResolvedValueOnce(updatedUser);

      const result = await service.registerInfoUser(sub, input);

      expect(mockManager.save).toHaveBeenCalledWith(RestaurantEntity, input.restaurant);
      expect(mockManager.create).toHaveBeenCalledTimes(2);
      expect(mockManager.save).toHaveBeenCalledWith(OpeningHourEntity, expect.any(Array));
      expect(mockManager.findOne).toHaveBeenCalledWith(UserEntity, {
        where: { sub },
        relations: ['restaurant', 'restaurant.openingHour']
      });
      expect(result).toEqual(updatedUser);
    });

    it('debe registrar un usuario restaurant sin horarios correctamente', async () => {
      const input: UserProfileDTO = {
        dni: '22222222',
        firstName: 'Simple',
        lastName: 'Restaurant',
        phone: '444444444',
        district: 'San Isidro',
        province: 'Lima',
        role: 'restaurant',
        restaurant: {
          name: 'Restaurante Simple',
          mapsAddress: 'Av. República 456',
          referentialAddress: 'Esquina con Av. Principal',
          latitude: -12.5678,
          longitude: -77.1234,
          dinerIn: false,
          delivery: true
        }
      };

      const savedRestaurant: RestaurantEntity = {
        id: 2,
        user: baseUser,
        name: 'Restaurante Simple',
        mapsAddress: 'Av. República 456',
        referentialAddress: 'Esquina con Av. Principal',
        latitude: -12.5678,
        longitude: -77.1234,
        ruc: null,
        legalName: null,
        whatsappOrders: null,
        yapePhone: null,
        logoUrl: null,
        bannerUrl: null,
        dinerIn: false,
        delivery: true,
        averageRating: 0,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deleteAt: new Date()
      };

      const updatedUser: UserEntity = {
        ...baseUser,
        dni: input.dni,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        district: input.district,
        province: input.province,
        role: input.role,
        restaurant: savedRestaurant
      };

      mockManager.findOne.mockResolvedValueOnce(baseUser);
      mockManager.save.mockResolvedValueOnce(savedRestaurant);
      mockManager.save.mockResolvedValueOnce(updatedUser);
      mockManager.findOne.mockResolvedValueOnce(updatedUser);

      const result = await service.registerInfoUser(sub, input);

      expect(mockManager.save).toHaveBeenCalledWith(RestaurantEntity, input.restaurant);
      expect(mockManager.create).not.toHaveBeenCalled();
      expect(mockManager.findOne).toHaveBeenCalledWith(UserEntity, {
        where: { sub },
        relations: []
      });
      expect(result).toEqual(updatedUser);
    });

    it('debe manejar el caso cuando no se encuentra el usuario', async () => {
      const input: UserProfileDTO = {
        dni: '99999999',
        firstName: 'Not',
        lastName: 'Found',
        phone: '000000000',
        district: 'Unknown',
        province: 'Unknown',
        role: 'consumer'
      };

      mockManager.findOne.mockResolvedValueOnce(null);

      await expect(service.registerInfoUser(sub, input)).rejects.toThrow();
    });
  });
});
