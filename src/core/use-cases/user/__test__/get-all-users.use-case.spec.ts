import { PaginationQueryParamDTO } from '../../../../interfaces/dto/pagination/request/pagination-query-param.dto';
import { SearchUserDto } from '../../../../interfaces/dto/search/search-filters.dto';
import { PaginationResponseUsers } from '../../../../interfaces/dto/user/response/pagination-users.dto';
import { IUserProfileRepository } from '../../../domain/repositories/user/user.repository.interface';
import { GetAllUsersUseCase } from '../get-all-users.use-case';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;
  let mockUserProfileRepository: jest.Mocked<IUserProfileRepository>;

  beforeEach(() => {
    mockUserProfileRepository = {
      getAllUsers: jest.fn(),
      registerInfoUser: jest.fn() // Ajusta según tu interfaz real
    } as any;

    useCase = new GetAllUsersUseCase(mockUserProfileRepository);
  });

  const paginationParams: PaginationQueryParamDTO = {
    page: 1,
    limit: 10
  };

  const searchFilters: SearchUserDto = {
    select: ['dni', 'firstName', 'lastName'],
    where: {
      role: 'admin',
      district: { op: 'like', value: 'Miraflores' }
    },
    order: {
      firstName: 'ASC'
    }
  };

  const expectedResponse: PaginationResponseUsers = {
    data: [
      {
        id: 1,
        username: 'juan.perez',
        sub: 'user-sub-123',
        emailVerified: true,
        providerId: 'auth0|123456',
        dni: '12345678',
        firstName: 'Juan',
        lastName: 'Pérez',
        phone: '987654321',
        email: 'juan.perez@example.com',
        profilePicture: 'https://example.com/profile1.jpg',
        district: 'Miraflores',
        province: 'Lima',
        role: 'admin',
        description: 'Administrador del sistema',
        admin: {
          // Ajusta según AdminResponseDTO
        }
      },
      {
        id: 2,
        username: 'maria.garcia',
        sub: 'user-sub-456',
        emailVerified: true,
        providerId: 'auth0|789012',
        dni: '87654321',
        firstName: 'María',
        lastName: 'García',
        phone: '123456789',
        email: 'maria.garcia@example.com',
        district: 'San Isidro',
        province: 'Lima',
        role: 'consumer',
        consumer: {
          userName: 'Luis',
          isDeleted: false
        }
      }
    ],
    paginationData: {
      total: 2,
      currentPage: 1,
      lastPage: 1,
      nextPage: 1,
      perPage: 10
    }
  };

  test('debe obtener y devolver usuarios paginados con filtros', async () => {
    mockUserProfileRepository.getAllUsers.mockResolvedValue(expectedResponse);

    const result = await useCase.execute(paginationParams, searchFilters);

    expect(mockUserProfileRepository.getAllUsers).toHaveBeenCalledWith(paginationParams, searchFilters);
    expect(result).toEqual(expectedResponse);
  });

  test('debe obtener usuarios con parámetros de paginación por defecto', async () => {
    const defaultPagination: PaginationQueryParamDTO = {
      page: 1,
      limit: 10
    };
    const emptyFilters: SearchUserDto = {};

    mockUserProfileRepository.getAllUsers.mockResolvedValue(expectedResponse);

    const result = await useCase.execute(defaultPagination, emptyFilters);

    expect(mockUserProfileRepository.getAllUsers).toHaveBeenCalledWith(defaultPagination, emptyFilters);
    expect(result).toEqual(expectedResponse);
  });

  test('debe manejar filtros con operadores complejos', async () => {
    const complexFilters: SearchUserDto = {
      select: ['dni', 'firstName', 'lastName', 'role'],
      where: {
        firstName: { op: 'like', value: 'Juan%' },
        age: { op: 'gte', value: 18 }
      },
      order: {
        lastName: 'DESC',
        firstName: 'ASC'
      },
      relations: ['profile', 'permissions']
    };

    mockUserProfileRepository.getAllUsers.mockResolvedValue(expectedResponse);

    const result = await useCase.execute(paginationParams, complexFilters);

    expect(mockUserProfileRepository.getAllUsers).toHaveBeenCalledWith(paginationParams, complexFilters);
    expect(result).toEqual(expectedResponse);
  });

  test('debe manejar paginación con diferentes valores', async () => {
    const customPagination: PaginationQueryParamDTO = {
      page: 2,
      limit: 5
    };

    const paginatedResponse: PaginationResponseUsers = {
      data: [
        {
          id: 2,
          username: 'maria.garcia',
          sub: 'user-sub-456',
          emailVerified: true,
          providerId: 'auth0|789012',
          dni: '87654321',
          firstName: 'María',
          lastName: 'García',
          phone: '123456789',
          email: 'maria.garcia@example.com',
          district: 'San Isidro',
          province: 'Lima',
          role: 'consumer'
        }
      ],
      paginationData: {
        total: 15,
        currentPage: 2,
        lastPage: 3,
        nextPage: 3,
        perPage: 5
      }
    };

    mockUserProfileRepository.getAllUsers.mockResolvedValue(paginatedResponse);

    const result = await useCase.execute(customPagination, searchFilters);

    expect(mockUserProfileRepository.getAllUsers).toHaveBeenCalledWith(customPagination, searchFilters);
    expect(result).toEqual(paginatedResponse);
    expect(result.paginationData.currentPage).toBe(2);
    expect(result.paginationData.nextPage).toBe(3);
    expect(result.paginationData.lastPage).toBe(3);
  });

  test('debe lanzar un error si falla el repositorio', async () => {
    mockUserProfileRepository.getAllUsers.mockRejectedValue(new Error('Error en base de datos'));

    await expect(useCase.execute(paginationParams, searchFilters)).rejects.toThrow('Error en base de datos');
    expect(mockUserProfileRepository.getAllUsers).toHaveBeenCalledWith(paginationParams, searchFilters);
  });

  test('debe manejar respuesta vacía', async () => {
    const emptyResponse: PaginationResponseUsers = {
      data: [],
      paginationData: {
        total: 0,
        currentPage: 1,
        lastPage: 0,
        nextPage: 0,
        perPage: 10
      }
    };

    mockUserProfileRepository.getAllUsers.mockResolvedValue(emptyResponse);

    const result = await useCase.execute(paginationParams, searchFilters);

    expect(mockUserProfileRepository.getAllUsers).toHaveBeenCalledWith(paginationParams, searchFilters);
    expect(result).toEqual(emptyResponse);
    expect(result.data).toHaveLength(0);
    expect(result.paginationData.total).toBe(0);
  });

  test('debe manejar filtros por rol específico', async () => {
    const roleFilters: SearchUserDto = {
      where: {
        role: 'consumer'
      }
    };

    const consumerResponse: PaginationResponseUsers = {
      data: [
        {
          id: 4,
          username: 'ana.consumer',
          sub: 'user-sub-101',
          emailVerified: true,
          providerId: 'auth0|101112',
          dni: '22222222',
          firstName: 'Ana',
          lastName: 'Consumidora',
          phone: '999888777',
          email: 'ana.consumer@example.com',
          district: 'Barranco',
          province: 'Lima',
          role: 'consumer',
          consumer: {
            userName: 'Luis',
            isDeleted: false
          }
        }
      ],
      paginationData: {
        total: 1,
        currentPage: 1,
        lastPage: 1,
        nextPage: 1,
        perPage: 10
      }
    };

    mockUserProfileRepository.getAllUsers.mockResolvedValue(consumerResponse);

    const result = await useCase.execute(paginationParams, roleFilters);

    expect(mockUserProfileRepository.getAllUsers).toHaveBeenCalledWith(paginationParams, roleFilters);
    expect(result).toEqual(consumerResponse);
    expect(result.data[0].role).toBe('consumer');
    expect(result.data[0]).toHaveProperty('consumer');
    expect(result.data[0].consumer).toBeDefined();
  });

  test('debe manejar usuario con restaurant', async () => {
    const restaurantFilters: SearchUserDto = {
      where: {
        role: 'restaurant'
      },
      relations: ['restaurant']
    };

    const restaurantResponse: PaginationResponseUsers = {
      data: [
        {
          id: 5,
          username: 'restaurant.owner',
          sub: 'user-sub-202',
          emailVerified: true,
          providerId: 'auth0|202203',
          dni: '33333333',
          firstName: 'Pedro',
          lastName: 'Restaurantero',
          phone: '111222333',
          email: 'pedro@restaurant.com',
          district: 'Miraflores',
          province: 'Lima',
          role: 'restaurant',
          description: 'Propietario de restaurante',
          restaurant: {
            id: 1,
            name: 'Mi Restaurante Saludable',
            mapsAddress: 'Av. Siempre Viva 123, Lima',
            latitude: -12.04318,
            longitude: -77.02824,
            ruc: '20123456789',
            legalName: 'Mi Empresa S.A.C.',
            whatsappOrders: '987654321',
            yapePhone: '987654321',
            logoUrl: 'https://example.com/logo.png',
            bannerUrl: 'https://example.com/banner.jpg',
            dinerIn: true,
            delivery: true
          }
        }
      ],
      paginationData: {
        total: 1,
        currentPage: 1,
        lastPage: 1,
        nextPage: 1,
        perPage: 10
      }
    };

    mockUserProfileRepository.getAllUsers.mockResolvedValue(restaurantResponse);

    const result = await useCase.execute(paginationParams, restaurantFilters);

    expect(mockUserProfileRepository.getAllUsers).toHaveBeenCalledWith(paginationParams, restaurantFilters);
    expect(result).toEqual(restaurantResponse);
    expect(result.data[0].role).toBe('restaurant');
    expect(result.data[0]).toHaveProperty('restaurant');
    expect(result.data[0].restaurant).toBeDefined();
  });
});
