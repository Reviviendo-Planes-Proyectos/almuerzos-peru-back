import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class RegisterUserProfileDto {
  @ApiProperty({ example: '12345678' })
  @IsString()
  @Length(8, 8)
  @IsNotEmpty({ message: 'El dni es requerido' })
  dni: string;

  @ApiProperty({ example: 'Luis' })
  @IsString()
  @Expose({ name: 'first_name' })
  @IsNotEmpty({ message: 'El first_name es requerido' })
  firstName: string;

  @ApiProperty({ example: 'Ventocilla' })
  @IsString()
  @Expose({ name: 'last_name' })
  @IsNotEmpty({ message: 'El last_name es requerido' })
  lastName: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @Length(9, 9)
  @IsNotEmpty({ message: 'El phone es requerido' })
  phone: string;

  @ApiProperty({ example: 'Los Olivos' })
  @IsString()
  @IsNotEmpty({ message: 'El disctrict es requerido' })
  district: string;

  @ApiProperty({ example: 'Lima' })
  @IsString()
  @IsNotEmpty({ message: 'El province es requerido' })
  province: string;

  @ApiProperty({ example: 'admin', enum: ['admin', 'consumer'] })
  @IsEnum({ ADMIN: 'admin', CONSUMER: 'consumer' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  role: 'admin' | 'consumer';

  @ApiProperty({ example: 'Descripcion del usuario ...', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
