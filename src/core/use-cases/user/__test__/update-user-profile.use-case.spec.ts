import { IUserProfileRepository } from '../../../domain/repositories/user/user.repository.interface';
import { UpdateUserProfileUseCase } from '../update-user-profile.use-case';
import { UpdateUserProfileDTO } from '../../../../interfaces/dto/user/request/update-user-profile.dto';
import { UserUpdateProfileDTO } from '../../../../interfaces/dto/user/response/user-update-profile.dto';

describe('UpdateUserProfileUseCase', () => {
  let useCase: UpdateUserProfileUseCase;
  let mockUserProfileRepository: jest.Mocked<IUserProfileRepository>;

  beforeEach(() => {
    mockUserProfileRepository = {
      updateUserProfile: jest.fn()
    } as any;

    useCase = new UpdateUserProfileUseCase(mockUserProfileRepository);
  });

  const sub = 'user-sub-123';
  const updateDto: UpdateUserProfileDTO = {
    phone: '123456789',
    district: 'San Isidro',
    province: 'Lima'
  };

  const expectedResponse: UserUpdateProfileDTO = {
    phone: '123456789',
    district: 'San Isidro',
    province: 'Lima'
  };

  test('debe actualizar y devolver el perfil de usuario', async () => {
    mockUserProfileRepository.updateUserProfile.mockResolvedValue(expectedResponse);

    const result = await useCase.execute(sub, updateDto);

    expect(mockUserProfileRepository.updateUserProfile).toHaveBeenCalledWith(sub, updateDto);
    expect(result).toEqual(expectedResponse);
  });

  test('debe lanzar un error si falla el repositorio', async () => {
    mockUserProfileRepository.updateUserProfile.mockRejectedValue(new Error('Error en base de datos'));

    await expect(useCase.execute(sub, updateDto)).rejects.toThrow('Error en base de datos');
    expect(mockUserProfileRepository.updateUserProfile).toHaveBeenCalledWith(sub, updateDto);
  });

  test('debe manejar datos parciales para actualización', async () => {
    const partialUpdateDto: UpdateUserProfileDTO = {
      phone: '555123456',
      district: 'Los Olivos',
      province: 'Lima'
    };

    const partialResponse: UserUpdateProfileDTO = {
      phone: '555123456',
      district: 'Los Olivos',
      province: 'Lima'
    };

    mockUserProfileRepository.updateUserProfile.mockResolvedValue(partialResponse);

    const result = await useCase.execute(sub, partialUpdateDto);

    expect(mockUserProfileRepository.updateUserProfile).toHaveBeenCalledWith(sub, partialUpdateDto);
    expect(result).toEqual(partialResponse);
  });
});
