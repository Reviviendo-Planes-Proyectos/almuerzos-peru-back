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
      'http://image.com/avatar.png',
      now,
      now
    );

    expect(user.id).toBe(1);
    expect(user.username).toBe('usuario_test');
    expect(user.email).toBe('test@correo.com');
    expect(user.sub).toBe('sub_123');
    expect(user.emailVerified).toBe(true);
    expect(user.providerId).toBe('google');
    expect(user.imageUrl).toBe('http://image.com/avatar.png');
    expect(user.createdAt).toBe(now);
    expect(user.updatedAt).toBe(now);
  });

  it('debería crear datos válidos con User.create', () => {
    const data = User.create({
      username: '  usuario_test  ',
      email: 'TEST@correo.com',
      sub: 'sub_123',
      providerId: 'google',
      imageUrl: '   http://image.com/avatar.png   '
    });

    expect(data.username).toBe('usuario_test');
    expect(data.email).toBe('test@correo.com');
    expect(data.sub).toBe('sub_123');
    expect(data.emailVerified).toBe(false); // valor por defecto
    expect(data.providerId).toBe('google');
    expect(data.imageUrl).toBe('http://image.com/avatar.png');
  });

  it('debería lanzar error si el email no es válido', () => {
    expect(() =>
      User.create({
        username: 'usuario_test',
        email: 'correo.com',
        sub: 'sub_123',
        providerId: 'google'
      })
    ).toThrow('Email must be valid');
  });

  it('debería lanzar error si el username está vacío', () => {
    expect(() =>
      User.create({
        username: '   ',
        email: 'test@correo.com',
        sub: 'sub_123',
        providerId: 'google'
      })
    ).toThrow('Username is required');
  });

  it('debería lanzar error si el sub está vacío', () => {
    expect(() =>
      User.create({
        username: 'usuario_test',
        email: 'test@correo.com',
        sub: '',
        providerId: 'google'
      })
    ).toThrow('Sub is required');
  });

  it('debería lanzar error si el providerId está vacío', () => {
    expect(() =>
      User.create({
        username: 'usuario_test',
        email: 'test@correo.com',
        sub: 'sub_123',
        providerId: '  '
      })
    ).toThrow('ProviderId is required');
  });
});
