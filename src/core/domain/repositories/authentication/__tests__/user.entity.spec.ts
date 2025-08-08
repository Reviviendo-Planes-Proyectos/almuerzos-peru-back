import { User } from '../user.entity';

describe('User (Domain)', () => {
  it('debería crear un usuario válido usando el constructor', () => {
    const now = new Date();
    const user = new User(
      1,
      'usuario_test',
      'test@correo.com',
      'sub_123',
      true,
      'google',
      '12345678',
      'Usuario',
      'Test',
      '987654321',
      'http://image.com/avatar.png',
      'San Miguel',
      'Lima',
      'Descripción del usuario',
      'consumer',
      undefined,
      undefined,
      {
        userName: 'Luis',
        isDeleted: false
      },
      false,
      now,
      now,
      null
    );
    expect(user.id).toBe(1);
    expect(user.username).toBe('usuario_test');
    expect(user.email).toBe('test@correo.com');
    expect(user.sub).toBe('sub_123');
    expect(user.emailVerified).toBe(true);
    expect(user.providerId).toBe('google');
    expect(user.profilePicture).toBe('http://image.com/avatar.png');
    expect(user.createdAt).toBe(now);
    expect(user.updatedAt).toBe(now);
  });

  it('debería crear datos válidos con User.create', () => {
    const data = User.createAuthentication({
      username: '  usuario_test  ',
      email: 'TEST@correo.com',
      sub: 'sub_123',
      providerId: 'google',
      profilePicture: '   http://image.com/avatar.png   '
    });

    expect(data.username).toBe('usuario_test');
    expect(data.email).toBe('test@correo.com');
    expect(data.sub).toBe('sub_123');
    expect(data.emailVerified).toBe(false); // valor por defecto
    expect(data.providerId).toBe('google');
    expect(data.profilePicture).toBe('http://image.com/avatar.png');
  });

  it('debería lanzar error si el email no es válido', () => {
    expect(() =>
      User.createAuthentication({
        username: 'usuario_test',
        email: 'correo.com',
        sub: 'sub_123',
        providerId: 'google'
      })
    ).toThrow('Email must be valid');
  });

  it('debería lanzar error si el username está vacío', () => {
    expect(() =>
      User.createAuthentication({
        username: '   ',
        email: 'test@correo.com',
        sub: 'sub_123',
        providerId: 'google'
      })
    ).toThrow('Username is required');
  });

  it('debería lanzar error si el sub está vacío', () => {
    expect(() =>
      User.createAuthentication({
        username: 'usuario_test',
        email: 'test@correo.com',
        sub: '',
        providerId: 'google'
      })
    ).toThrow('Sub is required');
  });

  it('debería lanzar error si el providerId está vacío', () => {
    expect(() =>
      User.createAuthentication({
        username: 'usuario_test',
        email: 'test@correo.com',
        sub: 'sub_123',
        providerId: '  '
      })
    ).toThrow('ProviderId is required');
  });

  it('deberia lanzar error si el dni está vacio', () => {
    expect(() =>
      User.createUserProfile({
        dni: '',
        firstName: 'Luis',
        lastName: 'Ventocilla',
        phone: '123456789',
        district: 'Los Olivos',
        province: 'Lima',
        role: 'admin',
        description: 'Description'
      })
    ).toThrow('DNI is required');
  });

  it('deberia lanzar error si el firtsname está vacio', () => {
    expect(() =>
      User.createUserProfile({
        dni: '12345678',
        firstName: '',
        lastName: 'Ventocilla',
        phone: '123456789',
        district: 'Los Olivos',
        province: 'Lima',
        role: 'admin',
        description: 'Description'
      })
    ).toThrow('First name is required');
  });

  it('debería lanzar error si el lastName está vacío', () => {
    expect(() =>
      User.createUserProfile({
        dni: '12345678',
        firstName: 'Luis',
        lastName: '',
        phone: '123456789',
        district: 'Los Olivos',
        province: 'Lima',
        role: 'admin',
        description: 'Description'
      })
    ).toThrow('Last name is required');
  });

  it('debería lanzar error si el phone está vacío', () => {
    expect(() =>
      User.createUserProfile({
        dni: '12345678',
        firstName: 'Luis',
        lastName: 'Ventocilla',
        phone: '',
        district: 'Los Olivos',
        province: 'Lima',
        role: 'admin',
        description: 'Description'
      })
    ).toThrow('Phone is required');
  });

  it('debería lanzar error si el disctrict está vacío', () => {
    expect(() =>
      User.createUserProfile({
        dni: '12345678',
        firstName: 'Luis',
        lastName: 'Ventocilla',
        phone: '123456789',
        district: '',
        province: 'Lima',
        role: 'admin',
        description: 'Description'
      })
    ).toThrow('District is required');
  });

  it('debería lanzar error si el province está vacío', () => {
    expect(() =>
      User.createUserProfile({
        dni: '12345678',
        firstName: 'Luis',
        lastName: 'Ventocilla',
        phone: '123456789',
        district: 'Los Olivos',
        province: ' ',
        role: 'admin',
        description: 'Description'
      })
    ).toThrow('Province is required');
  });
  it('debería lanzar error si el role es inválido', () => {
    expect(() =>
      User.createUserProfile({
        dni: '12345678',
        firstName: 'Luis',
        lastName: 'Ventocilla',
        phone: '123456789',
        district: 'Los Olivos',
        province: 'Lima',
        role: 'otro' as any,
        description: 'Description'
      })
    ).toThrow('Invalid role');
  });
});
