import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RestaurantDTO } from '../../restaurant/response/restaurant.dto';
export class AdminResponseDTO {
  @Expose({ name: 'is_deleted' })
  isDeleted: boolean;
}

export class ConsumerResponseDTO {
  @Expose({ name: 'is_deleted' })
  isDeleted: boolean;
}

export class UserRegisterProfileDTO {
  @ApiProperty({ example: '12345678' })
  @Expose()
  dni: string;

  @ApiProperty({ example: 'Luis' })
  @Expose({ name: 'first_name' })
  firstName: string;

  @ApiProperty({ example: 'Ventocilla' })
  @Expose({ name: 'last_name' })
  lastName: string;

  @ApiProperty({ example: '123456789' })
  @Expose()
  phone: string;

  @ApiProperty({ example: 'Puente Piedra' })
  @Expose()
  district: string;

  @ApiProperty({ example: 'Lima' })
  @Expose()
  province: string;

  @ApiProperty({ example: 'admin', enum: ['admin', 'consumer', 'restaurant'] })
  @Expose()
  role: 'admin' | 'consumer' | 'restaurant';

  @ApiProperty({ example: 'Descripcion del usuario ...', required: false })
  @Expose()
  description?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  @Expose({ name: 'image_url' })
  imageUrl?: string;

  @Expose()
  @Type(() => AdminResponseDTO)
  admin?: AdminResponseDTO;

  @Expose()
  @Type(() => ConsumerResponseDTO)
  consumer?: ConsumerResponseDTO;

  @Expose()
  @Type(() => RestaurantDTO)
  restaurant?: RestaurantDTO;
}
