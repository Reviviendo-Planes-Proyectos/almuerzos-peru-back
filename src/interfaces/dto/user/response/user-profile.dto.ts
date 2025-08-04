import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterProfileDTO {
  @ApiProperty({ example: '12345678' })
  dni: string;

  @ApiProperty({ example: 'Luis' })
  firstName: string;

  @ApiProperty({ example: 'Ventocilla' })
  lastName: string;

  @ApiProperty({ example: '123456789' })
  phone: string;

  @ApiProperty({ example: 'Puente Piedra' })
  district: string;

  @ApiProperty({ example: 'Lima' })
  province: string;

  @ApiProperty({ example: 'admin', enum: ['admin', 'consumer'] })
  role: 'admin' | 'consumer';

  @ApiProperty({ example: 'Descripcion del usuario ...', required: false })
  description?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  imageUrl?: string;
}
