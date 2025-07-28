import { UserUseCases } from 'src/core/use-cases/user/user.use-cases';
import { runUserTests } from '../scripts/test-typeorm';
import { NestFactory } from '@nestjs/core';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn()
  }
}));

const mockGetAllUsers = jest.fn().mockResolvedValue([]);
const mockCreateUser = jest.fn().mockResolvedValue({ id: 1, name: 'Mock User', email: 'mock@mail.com' });
const mockGetUserById = jest.fn().mockResolvedValue({ id: 1, name: 'Mock User', email: 'mock@mail.com' });
const mockUpdateUser = jest.fn().mockResolvedValue({ id: 1, name: 'Actualizado', email: 'mock@mail.com' });

const mockUsersUseCases = {
  getAllUsers: mockGetAllUsers,
  createUser: mockCreateUser,
  getUserById: mockGetUserById,
  updateUser: mockUpdateUser
};

const mockApp = {
  get: jest.fn().mockReturnValue(mockUsersUseCases),
  close: jest.fn().mockResolvedValue(undefined)
};

describe('runUserTests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  it('✅ debería ejecutar el flujo correctamente', async () => {
    const result = await runUserTests();
    expect(result).toBe(true);
    expect(mockApp.get).toHaveBeenCalledWith(UserUseCases);
    expect(mockGetAllUsers).toHaveBeenCalledTimes(2);
    expect(mockCreateUser).toHaveBeenCalled();
    expect(mockGetUserById).toHaveBeenCalled();
    expect(mockUpdateUser).toHaveBeenCalled();
    expect(mockApp.close).toHaveBeenCalled();
  });

  it('❌ debería retornar false si ocurre un error', async () => {
    (NestFactory.create as jest.Mock).mockRejectedValueOnce(new Error('DB fail'));

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería retornar false si falla createUser', async () => {
    mockCreateUser.mockRejectedValueOnce(new Error('Error al crear usuario'));

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería retornar false si falla getUserById', async () => {
    mockGetUserById.mockRejectedValueOnce(new Error('No se pudo obtener usuario'));

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería retornar false si falla updateUser', async () => {
    mockUpdateUser.mockRejectedValueOnce(new Error('Error al actualizar usuario'));

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería retornar false si falla getAllUsers en la segunda llamada', async () => {
    mockGetAllUsers.mockResolvedValueOnce([]).mockRejectedValueOnce(new Error('Error al listar usuarios'));

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería loggear código y detalle de error si existen', async () => {
    const error = new Error('Error con código y detalle') as any;
    error.code = 'ERR123';
    error.detail = 'Detalle del error';

    (NestFactory.create as jest.Mock).mockRejectedValueOnce(error);

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería loggear "No disponible" si error no tiene detail', async () => {
    const error = new Error('Error sin detalle') as any;
    error.code = 'ERR456';

    (NestFactory.create as jest.Mock).mockRejectedValueOnce(error);

    const result = await runUserTests();
    expect(result).toBe(false);
  });
});
