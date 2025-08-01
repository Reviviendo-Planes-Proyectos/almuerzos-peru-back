import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserFromFirebaseAuthUseCase } from 'src/core/use-cases/authentication/create-user-from-firebase-auth.use-case';
import { CreateUserFromFirebaseDto } from 'src/interfaces/dto/authentication/request/create-user-from-firebase.dto';
import { AuthResponseDto } from 'src/interfaces/dto/authentication/response/response-auth-user.dto';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthenticationController {
  constructor(private readonly createUserFromFirebaseAuthUseCase: CreateUserFromFirebaseAuthUseCase) {}

  @Post('social')
  @ApiOperation({ summary: 'Crear usuario desde cualquier plataforma' })
  @ApiBody({ type: CreateUserFromFirebaseDto })
  @ApiCreatedResponse({
    description: 'Usuario creado exitosamente',
    type: AuthResponseDto
  })
  async createUserFromFirebase(@Body() { token }: CreateUserFromFirebaseDto) {
    try {
      return await this.createUserFromFirebaseAuthUseCase.execute(token);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
