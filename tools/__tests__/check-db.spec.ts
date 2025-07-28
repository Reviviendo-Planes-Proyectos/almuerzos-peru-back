import { checkDatabaseConnection } from '../scripts/check-db';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

jest.mock('@nestjs/core');

describe('checkDatabaseConnection', () => {
  const mockLog = jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
  const mockError = jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

  const mockApp = {
    get: jest.fn(),
    close: jest.fn()
  };

  const mockDataSource = {
    isInitialized: true,
    options: { database: 'test_db', host: 'localhost' },
    query: jest.fn().mockResolvedValue([{ current_time: '2025-07-21 10:00:00' }])
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
    mockApp.get.mockReturnValue(mockDataSource);
  });

  it('✅ debe retornar true si la conexión a la base de datos es exitosa', async () => {
    const result = await checkDatabaseConnection();
    expect(result).toBe(true);
    expect(mockApp.close).toHaveBeenCalled();
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('Conexión exitosa'));
  });

  it('❌ debe retornar false si la base de datos no está inicializada', async () => {
    mockDataSource.isInitialized = false;

    const result = await checkDatabaseConnection();
    expect(result).toBe(false);
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('Conexión fallida'));
  });

  it('❌ debe retornar false si ocurre un error en la conexión', async () => {
    (NestFactory.create as jest.Mock).mockRejectedValue(new Error('Falló conexión'));

    const result = await checkDatabaseConnection();
    expect(result).toBe(false);
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('Falló conexión'));
  });

  it('🧪 debe ejecutar la consulta de prueba SELECT NOW()', async () => {
    mockDataSource.isInitialized = true;
    mockDataSource.query = jest.fn().mockResolvedValue([{ current_time: '2025-07-21 10:00:00' }]);

    await checkDatabaseConnection();

    expect(mockDataSource.query).toHaveBeenCalledWith('SELECT NOW() as current_time');
  });

  it('❌ debe retornar false si falla la consulta SELECT NOW()', async () => {
    mockDataSource.isInitialized = true;
    mockDataSource.query = jest.fn().mockRejectedValue(new Error('Error en SELECT NOW()'));

    const result = await checkDatabaseConnection();

    expect(result).toBe(false);
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('Error en SELECT NOW()'));
  });
});
