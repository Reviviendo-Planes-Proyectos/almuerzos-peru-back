import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserFromGoogleDto {
  @ApiProperty({ example: '1034321398123123...' })
  @IsString()
  @IsNotEmpty({ message: 'El token es requerido' })
  token: string;
}
