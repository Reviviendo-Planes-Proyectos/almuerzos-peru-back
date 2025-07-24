import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'correo@ejemplo.com' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  name: string;

  @ApiPropertyOptional({ example: '+51999999999' })
  @IsOptional()
  @IsPhoneNumber('PE', {
    message: 'El teléfono debe ser un número válido de Perú'
  })
  phone?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Juan Pérez' })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  name?: string;

  @ApiPropertyOptional({ example: '+51999999999' })
  @IsOptional()
  @IsPhoneNumber('PE', {
    message: 'El teléfono debe ser un número válido de Perú'
  })
  phone?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  isActive?: boolean;
}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'correo@ejemplo.com' })
  email: string;
  @ApiProperty({ example: 'Juan Pérez' })
  name: string;
  @ApiPropertyOptional({ example: '+51999999999' })
  phone?: string;
  @ApiProperty({ example: true })
  isActive: boolean;
  @ApiProperty({ example: '2024-07-23T12:00:00.000Z' })
  createdAt: Date;
  @ApiProperty({ example: '2024-07-23T12:00:00.000Z' })
  updatedAt: Date;
}
