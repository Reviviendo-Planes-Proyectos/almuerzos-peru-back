import { runUserTests } from './test-typeorm';
import { NestFactory } from '@nestjs/core';
import { UsersUseCases } from '../modules/users/application/users.use-cases';

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
    expect(mockApp.get).toHaveBeenCalledWith(UsersUseCases);
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
});
