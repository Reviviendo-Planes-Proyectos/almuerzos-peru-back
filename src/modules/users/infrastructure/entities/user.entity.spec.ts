import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  it('debería crear una instancia con los valores requeridos', () => {
    const now = new Date();
    const user = new UserEntity();
    user.id = 1;
    user.email = 'test@correo.com';
    user.name = 'Usuario Test';
    user.phone = '+51 999 888 777';
    user.isActive = true;
    user.createdAt = now;
    user.updatedAt = now;

    expect(user.id).toBe(1);
    expect(user.email).toBe('test@correo.com');
    expect(user.name).toBe('Usuario Test');
    expect(user.phone).toBe('+51 999 888 777');
    expect(user.isActive).toBe(true);
    expect(user.createdAt).toBe(now);
    expect(user.updatedAt).toBe(now);
  });

  it('debería permitir phone como undefined', () => {
    const user = new UserEntity();
    user.phone = undefined;
    expect(user.phone).toBeUndefined();
  });
});
