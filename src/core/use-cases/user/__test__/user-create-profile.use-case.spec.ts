import { IUserProfileRepository } from '../../../domain/repositories/user/user.repository.interface';
import { UserCreateProfileUseCase } from '../user-create-profile.use-case';
import { RegisterUserProfileDto } from '../../../../interfaces/dto/user/request/create-user-profile.dto';
import { User } from '../../../domain/repositories/authentication/user.entity';
import { UserRegisterProfileDTO } from '../../../../interfaces/dto/user/response/user-profile.dto';

describe('UserCreateProfileUseCase', () => {
  let useCase: UserCreateProfileUseCase;
  let mockUserProfileRepository: jest.Mocked<IUserProfileRepository>;

  beforeEach(() => {
    mockUserProfileRepository = {
      registerInfoUser: jest.fn()
    } as any;

    useCase = new UserCreateProfileUseCase(mockUserProfileRepository);
  });

  const sub = 'user-sub-123';
  const dto: RegisterUserProfileDto = {
    dni: '12345678',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '987654321',
    district: 'Miraflores',
    province: 'Lima',
    role: 'admin'
  };

  const domainProfile = User.createUserProfile(dto);

  const expectedResponse: UserRegisterProfileDTO = {
    dni: '12345678',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '987654321',
    district: 'Miraflores',
    province: 'Lima',
    role: 'admin'
  };

  test('debe registrar y devolver el perfil de usuario', async () => {
    mockUserProfileRepository.registerInfoUser.mockResolvedValue(expectedResponse);

    const result = await useCase.execute(sub, dto);

    expect(mockUserProfileRepository.registerInfoUser).toHaveBeenCalledWith(sub, domainProfile);
    expect(result).toEqual(expectedResponse);
  });

  test('debe lanzar un error si falla el repositorio', async () => {
    mockUserProfileRepository.registerInfoUser.mockRejectedValue(new Error('Error en base de datos'));

    await expect(useCase.execute(sub, dto)).rejects.toThrow('Error en base de datos');
    expect(mockUserProfileRepository.registerInfoUser).toHaveBeenCalledWith(sub, domainProfile);
  });
});
