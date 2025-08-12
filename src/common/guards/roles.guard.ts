import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserServiceCommon } from '../user-common/user.service';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role/role.enum';
import { ROLES_KEY } from '../decorators/role/role.decorator';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly userService: UserServiceCommon,
    private readonly reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const userPayload = request.user as { sub: string };

    const roleUser = await this.userService.findRoleByUserSub(userPayload.sub);

    if (!roleUser) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!requiredRoles.includes(roleUser as Role)) {
      throw new ForbiddenException('No tienes el rol requerido');
    }
    return true;
  }
}
