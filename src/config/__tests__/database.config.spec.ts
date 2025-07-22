import { databaseConfig } from '../database.config';

describe('databaseConfig', () => {
  it('debería tener las propiedades necesarias', () => {
    expect(databaseConfig).toHaveProperty('type', 'postgres');
    expect(databaseConfig).toHaveProperty('host');
    expect(databaseConfig).toHaveProperty('port');
    expect(databaseConfig).toHaveProperty('username');
    expect(databaseConfig).toHaveProperty('password');
    expect(databaseConfig).toHaveProperty('database');
    expect(databaseConfig).toHaveProperty('synchronize', true);
    expect(databaseConfig).toHaveProperty('autoLoadEntities', true);
  });
});
