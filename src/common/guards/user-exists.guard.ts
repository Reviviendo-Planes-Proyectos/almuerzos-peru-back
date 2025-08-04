import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserServiceCommon } from '../user-common/user.service';
import { Request } from 'express';

@Injectable()
export class UserExistGuad implements CanActivate {
  constructor(private readonly userService: UserServiceCommon) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { sub: string };
    if (!user || !user.sub) {
      throw new UnauthorizedException('Token inválido o sin usuario');
    }
    const userInDb = await this.userService.userExistBySub(user.sub);
    if (!userInDb) {
      throw new UnauthorizedException('Usuario no existe');
    }
    return true;
  }
}
