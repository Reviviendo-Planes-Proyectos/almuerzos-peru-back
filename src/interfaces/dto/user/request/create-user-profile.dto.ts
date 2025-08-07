import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreateRestaurantDto } from '../../restaurant/request/create-restaurant.dto';

export class RegisterUserProfileDto {
  @ApiProperty({ example: '12345678' })
  @IsString()
  @Length(8, 8)
  @IsNotEmpty({ message: 'El dni es requerido' })
  dni: string;

  @ApiProperty({ example: 'Luis', name: 'first_name' })
  @IsString()
  @Expose({ name: 'first_name' })
  @IsNotEmpty({ message: 'El first_name es requerido' })
  firstName: string;

  @ApiProperty({ example: 'Ventocilla', name: 'last_name' })
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

  @ApiProperty({ example: 'admin', enum: ['admin', 'consumer', 'restaurant'] })
  @IsEnum({ ADMIN: 'admin', CONSUMER: 'consumer', RESTAURANT: 'restaurant' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  role: 'admin' | 'consumer' | 'restaurant';

  @ApiProperty({ example: 'Descripcion del usuario ...', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: () => CreateRestaurantDto,
    required: false,
    description: 'Información del restaurante (solo si el rol es "restaurant")'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRestaurantDto)
  restaurant?: CreateRestaurantDto;
}
