import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserExistGuad } from 'src/common/guards/user-exists.guard';
import { UserCreateProfileUseCase } from 'src/core/use-cases/user/user-create-profile.use-case';
import { RegisterUserProfileDto } from 'src/interfaces/dto/user/request/create-user-profile.dto';
import { Request } from 'express';
import { UserRegisterProfileDTO } from 'src/interfaces/dto/user/response/user-profile.dto';

@UseGuards(JwtAuthGuard, UserExistGuad)
@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userCreateProfileUseCase: UserCreateProfileUseCase) {}

  @Post('profile')
  @ApiOperation({ summary: 'Registrar el perfil del usuario' })
  @ApiBody({ type: RegisterUserProfileDto })
  @ApiCreatedResponse({
    description: 'Perfil del usuario registrado',
    type: UserRegisterProfileDTO
  })
  async createProfileUser(@Req() req: Request, @Body() profile: RegisterUserProfileDto) {
    try {
      const user = req.user as { sub: string };
      return await this.userCreateProfileUseCase.execute(user.sub, profile);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
