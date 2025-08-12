import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { RoleGuard } from '../roles.guard';
import { UserServiceCommon } from '../../user-common/user.service';
import { Role } from '../../enums/role/role.enum';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let userService: jest.Mocked<UserServiceCommon>;
  let reflector: jest.Mocked<Reflector>;

  const mockContext = (roles: Role[] | null, userSub: string = 'user123') =>
    ({
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { sub: userSub } })
      })
    }) as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleGuard,
        { provide: UserServiceCommon, useValue: { findRoleByUserSub: jest.fn() } },
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } }
      ]
    }).compile();

    guard = module.get<RoleGuard>(RoleGuard);
    userService = module.get(UserServiceCommon);
    reflector = module.get(Reflector);
  });

  describe('canActivate', () => {
    it('should return true when no roles required', async () => {
      reflector.getAllAndOverride.mockReturnValue(null);
      const result = await guard.canActivate(mockContext(null));
      expect(result).toBe(true);
    });

    it('should return true when user has required role', async () => {
      reflector.getAllAndOverride.mockReturnValue([Role.ADMIN]);
      userService.findRoleByUserSub.mockResolvedValue(Role.ADMIN);

      const result = await guard.canActivate(mockContext([Role.ADMIN]));

      expect(result).toBe(true);
      expect(userService.findRoleByUserSub).toHaveBeenCalledWith('user123');
    });

    it('should throw UnauthorizedException when user not found', async () => {
      reflector.getAllAndOverride.mockReturnValue([Role.ADMIN]);
      userService.findRoleByUserSub.mockResolvedValue(null);

      await expect(guard.canActivate(mockContext([Role.ADMIN]))).rejects.toThrow(
        new UnauthorizedException('Usuario no encontrado')
      );
    });

    it('should throw ForbiddenException when user lacks required role', async () => {
      reflector.getAllAndOverride.mockReturnValue([Role.ADMIN]);
      userService.findRoleByUserSub.mockResolvedValue(Role.CONSUMER);

      await expect(guard.canActivate(mockContext([Role.ADMIN]))).rejects.toThrow(
        new ForbiddenException('No tienes el rol requerido')
      );
    });

    it('should work with multiple required roles', async () => {
      reflector.getAllAndOverride.mockReturnValue([Role.ADMIN, Role.RESTAURANT]);
      userService.findRoleByUserSub.mockResolvedValue(Role.RESTAURANT);

      const result = await guard.canActivate(mockContext([Role.ADMIN, Role.RESTAURANT]));
      expect(result).toBe(true);
    });
  });
});
