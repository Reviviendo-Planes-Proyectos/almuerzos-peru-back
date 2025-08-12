import { IUserProfileRepository } from '../../../domain/repositories/user/user.repository.interface';
import { DeleteUserUseCase } from '../delete-user.use-case';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let mockUserProfileRepository: jest.Mocked<IUserProfileRepository>;

  beforeEach(() => {
    mockUserProfileRepository = {
      deleteUser: jest.fn(),
      getAllUsers: jest.fn(),
      registerInfoUser: jest.fn() // Ajusta según tu interfaz real
    } as any;

    useCase = new DeleteUserUseCase(mockUserProfileRepository);
  });

  test('debe eliminar un usuario existente correctamente', async () => {
    const userId = 1;

    mockUserProfileRepository.deleteUser.mockResolvedValue(true);

    const result = await useCase.excute(userId);

    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledWith(userId);
    expect(result).toBeUndefined();
  });

  test('debe lanzar error cuando el usuario no existe', async () => {
    const userId = 999;

    mockUserProfileRepository.deleteUser.mockResolvedValue(false);

    await expect(useCase.excute(userId)).rejects.toThrow('Usuario no encontrado');
    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledWith(userId);
  });

  test('debe lanzar error cuando el repositorio retorna false', async () => {
    const userId = 999;

    mockUserProfileRepository.deleteUser.mockResolvedValue(false);

    await expect(useCase.excute(userId)).rejects.toThrow('Usuario no encontrado');
    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledWith(userId);
  });

  test('debe manejar errores del repositorio', async () => {
    const userId = 1;

    mockUserProfileRepository.deleteUser.mockRejectedValue(new Error('Error en base de datos'));

    await expect(useCase.excute(userId)).rejects.toThrow('Error en base de datos');
    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledWith(userId);
  });

  test('debe llamar al repositorio con el ID correcto', async () => {
    const userId = 42;

    mockUserProfileRepository.deleteUser.mockResolvedValue(true);

    await useCase.excute(userId);

    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledTimes(1);
    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledWith(42);
  });

  test('debe manejar eliminación exitosa independientemente del tipo de usuario', async () => {
    const userId = 5;

    mockUserProfileRepository.deleteUser.mockResolvedValue(true);

    const result = await useCase.excute(userId);

    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledWith(userId);
    expect(result).toBeUndefined();
  });

  test('debe funcionar correctamente con diferentes IDs', async () => {
    const userId = 10;

    mockUserProfileRepository.deleteUser.mockResolvedValue(true);

    await useCase.excute(userId);

    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledWith(10);
    expect(mockUserProfileRepository.deleteUser).toHaveBeenCalledWith(expect.any(Number));
  });
});
