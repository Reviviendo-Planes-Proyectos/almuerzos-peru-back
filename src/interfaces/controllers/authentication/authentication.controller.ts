import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserFromFirebaseAuthUseCase } from 'src/core/use-cases/authentication/create-user-from-firebase-auth.use-case';
import { CreateUserFromGoogleDto } from 'src/interfaces/dto/authentication/request/create-user-from-google.dto';
import { AuthResponseDto } from 'src/interfaces/dto/authentication/response/response-auth-user.dto';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthenticationContrller {
  constructor(private readonly createUserFromGoogleUseCase: CreateUserFromFirebaseAuthUseCase) {}

  @Post('social')
  @ApiOperation({ summary: 'Crear usuario desde Google' })
  @ApiBody({ type: CreateUserFromGoogleDto })
  @ApiCreatedResponse({
    description: 'Usuario creado exitosamente',
    type: AuthResponseDto
  })
  async createUserFromGoogle(@Body() { token }: CreateUserFromGoogleDto) {
    try {
      return await this.createUserFromGoogleUseCase.execute(token);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
