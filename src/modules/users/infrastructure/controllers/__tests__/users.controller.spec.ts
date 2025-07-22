import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { UsersController } from '../users.controller';
import { UsersUseCases } from '../../../application/users.use-cases';

describe('UsersController', () => {
  let controller: UsersController;
  let useCases: Partial<UsersUseCases>;

  beforeEach(async () => {
    useCases = {
      getAllUsers: jest.fn().mockResolvedValue([{ id: 1 }]),
      getUserById: jest.fn().mockResolvedValue({ id: 1 }),
      createUser: jest.fn().mockResolvedValue({ id: 2 }),
      updateUser: jest.fn().mockResolvedValue({ id: 3 }),
      deleteUser: jest.fn().mockResolvedValue(undefined)
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersUseCases, useValue: useCases }]
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('findAll retorna usuarios', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1 }]);
  });

  it('findOne retorna usuario existente', async () => {
    expect(await controller.findOne(1)).toEqual({ id: 1 });
  });

  it('findOne lanza error si no existe', async () => {
    (useCases.getUserById as jest.Mock).mockResolvedValue(null);
    await expect(controller.findOne(99)).rejects.toThrow(HttpException);
  });

  it('create retorna usuario creado', async () => {
    expect(await controller.create({} as any)).toEqual({ id: 2 });
  });

  it('create lanza error si email existe', async () => {
    (useCases.createUser as jest.Mock).mockRejectedValue({ message: 'Email already exists' });
    await expect(controller.create({} as any)).rejects.toThrow(HttpException);
  });

  it('update retorna usuario actualizado', async () => {
    expect(await controller.update(1, {} as any)).toEqual({ id: 3 });
  });

  it('update lanza error si no existe', async () => {
    (useCases.updateUser as jest.Mock).mockResolvedValue(null);
    await expect(controller.update(99, {} as any)).rejects.toThrow(HttpException);
  });

  it('remove retorna mensaje de éxito', async () => {
    expect(await controller.remove(1)).toEqual({ message: 'User deleted successfully' });
  });

  it('remove lanza error si no existe', async () => {
    (useCases.deleteUser as jest.Mock).mockRejectedValue({ message: 'User not found' });
    await expect(controller.remove(99)).rejects.toThrow(HttpException);
  });

  it('findOne lanza error 500 si es un error inesperado', async () => {
    (useCases.getUserById as jest.Mock).mockRejectedValue(new Error('DB failure'));
    await expect(controller.findOne(1)).rejects.toThrow('DB failure');
  });

  it('create lanza error 400 si falla diferente de email', async () => {
    (useCases.createUser as jest.Mock).mockRejectedValue(new Error('Validation error'));
    await expect(controller.create({} as any)).rejects.toThrow('Validation error');
  });

  it('update lanza error 400 si es un error inesperado', async () => {
    (useCases.updateUser as jest.Mock).mockRejectedValue(new Error('Unexpected error'));
    await expect(controller.update(1, {} as any)).rejects.toThrow('Unexpected error');
  });

  it('remove lanza error 500 si es un error inesperado', async () => {
    (useCases.deleteUser as jest.Mock).mockRejectedValue(new Error('Internal error'));
    await expect(controller.remove(1)).rejects.toThrow('Internal error');
  });
});
