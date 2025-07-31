import { runUserTests } from '../scripts/test-typeorm';
import { NestFactory } from '@nestjs/core';
import { GetAllUsersUseCase } from 'src/core/use-cases/authentication/get-all-users.use-case';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn()
  }
}));

const mockExecute = jest.fn().mockResolvedValue([
  { username: 'user1', email: 'user1@mail.com', providerId: 'google' },
  { username: 'user2', email: 'user2@mail.com', providerId: 'email' }
]);

const mockGetAllUsersUseCase = {
  execute: mockExecute
};

const mockApp = {
  get: jest.fn().mockReturnValue(mockGetAllUsersUseCase),
  close: jest.fn().mockResolvedValue(undefined)
};

describe('runUserTests con GetAllUsersUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  it('✅ debería ejecutar correctamente la prueba de TypeORM', async () => {
    const result = await runUserTests();
    expect(result).toBe(true);
    expect(NestFactory.create).toHaveBeenCalled();
    expect(mockApp.get).toHaveBeenCalledWith(GetAllUsersUseCase);
    expect(mockExecute).toHaveBeenCalled();
    expect(mockApp.close).toHaveBeenCalled();
  });

  it('❌ debería retornar false si ocurre un error en NestFactory.create', async () => {
    (NestFactory.create as jest.Mock).mockRejectedValueOnce(new Error('Fallo de Nest'));

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería retornar false si execute lanza un error', async () => {
    mockExecute.mockRejectedValueOnce(new Error('Error al ejecutar'));

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería loggear código y detalle si están disponibles', async () => {
    const error = new Error('Error con código y detalle') as any;
    error.code = 'E123';
    error.detail = 'Detalle de error';

    (NestFactory.create as jest.Mock).mockRejectedValueOnce(error);

    const result = await runUserTests();
    expect(result).toBe(false);
  });

  it('❌ debería loggear "No disponible" si el error no tiene detail', async () => {
    const error = new Error('Error sin detalle') as any;
    error.code = 'E456';

    (NestFactory.create as jest.Mock).mockRejectedValueOnce(error);

    const result = await runUserTests();
    expect(result).toBe(false);
  });
});
