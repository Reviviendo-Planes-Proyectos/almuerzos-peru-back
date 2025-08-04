import { JwtStrategy } from '../jwt.strategy';
import { ConfigService } from '@nestjs/config';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(() => {
    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'JWT_SECRET') return 'test-secret';
        return null;
      })
    };

    jwtStrategy = new JwtStrategy(mockConfigService as ConfigService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should call ConfigService to get JWT secret', () => {
    expect(mockConfigService.get).toHaveBeenCalledWith('JWT_SECRET');
  });

  it('should validate the JWT payload correctly', () => {
    const payload = {
      sub: 'user-id-123',
      email: 'test@example.com',
      username: 'testuser'
    };

    const result = jwtStrategy.validate(payload);

    expect(result).toEqual({
      sub: 'user-id-123',
      email: 'test@example.com',
      username: 'testuser'
    });
  });
});
