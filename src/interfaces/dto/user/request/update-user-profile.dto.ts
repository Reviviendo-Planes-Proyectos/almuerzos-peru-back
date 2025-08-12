import { ApiProperty } from '@nestjs/swagger';
import { CreateRestaurantDto } from '../../restaurant/request/create-restaurant.dto';
import { IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ConsumerDTO {
  @ApiProperty({ example: 'Luis Fernando' })
  @IsString()
  userName: string;
}

export class UpdateUserProfileDTO {
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

  @ApiProperty({ example: 'Descripcion del usuario ...', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    type: () => CreateRestaurantDto,
    required: false,
    description: 'Información del restaurante (solo si el rol es "restaurant")'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRestaurantDto)
  restaurant?: CreateRestaurantDto;

  @ApiProperty({
    type: () => ConsumerDTO,
    required: false,
    description: 'Información del consumidor (solo si el rol es "restaurant")'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConsumerDTO)
  consumer?: ConsumerDTO;
}
