import { User } from './user.entity';

describe('User (Domain)', () => {
  it('debería crear un usuario válido', () => {
    const now = new Date();
    const user = new User(1, 'test@correo.com', 'Usuario Test', '+51 999 888 777', true, now, now);
    expect(user.id).toBe(1);
    expect(user.email).toBe('test@correo.com');
    expect(user.name).toBe('Usuario Test');
    expect(user.phone).toBe('+51 999 888 777');
    expect(user.isActive).toBe(true);
    expect(user.createdAt).toBe(now);
    expect(user.updatedAt).toBe(now);
  });

  it('debería crear datos válidos con User.create', () => {
    const data = User.create({ email: 'TEST@correo.com', name: '  Nombre  ', phone: ' 123 ' });
    expect(data.email).toBe('test@correo.com');
    expect(data.name).toBe('Nombre');
    expect(data.phone).toBe('123');
    expect(data.isActive).toBe(true);
  });

  it('debería lanzar error si el email no es válido', () => {
    expect(() => User.create({ email: 'correo.com', name: 'Nombre' })).toThrow('Email must be valid');
  });

  it('debería lanzar error si el nombre está vacío', () => {
    expect(() => User.create({ email: 'test@correo.com', name: '   ' })).toThrow('Name is required');
  });

  it('updateProfile actualiza nombre y teléfono', () => {
    const now = new Date();
    const user = new User(1, 'test@correo.com', 'Nombre', undefined, true, now, now);
    user.updateProfile('Nuevo Nombre', '999');
    expect(user.name).toBe('Nuevo Nombre');
    expect(user.phone).toBe('999');
  });

  it('updateProfile lanza error si el nombre es vacío', () => {
    const now = new Date();
    const user = new User(1, 'test@correo.com', 'Nombre', undefined, true, now, now);
    expect(() => user.updateProfile('')).toThrow('Name is required');
  });

  it('deactivate y activate cambian isActive', () => {
    const now = new Date();
    const user = new User(1, 'test@correo.com', 'Nombre', undefined, true, now, now);
    user.deactivate();
    expect(user.isActive).toBe(false);
    user.activate();
    expect(user.isActive).toBe(true);
  });
});
