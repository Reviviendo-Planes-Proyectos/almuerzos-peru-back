import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RestaurantResponseDTO } from '../../restaurant/response/restaurant.dto';
export class AdminResponseDTO {
  @ApiProperty({ example: false })
  @Expose()
  isDeleted?: boolean;
}

export class ConsumerResponseDTO {
  @ApiProperty({ example: 'Luis' })
  @Expose()
  userName: string;

  @ApiProperty({ example: false })
  @Expose()
  isDeleted?: boolean;
}

export class UserRegisterProfileDTO {
  @ApiProperty({ example: '12345678' })
  @Expose()
  dni: string;

  @ApiProperty({ example: 'Luis' })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Ventocilla' })
  @Expose()
  lastName: string;

  @ApiProperty({ example: '123456789' })
  @Expose()
  phone: string;

  @ApiProperty()
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
  @Expose()
  profilePicture?: string;

  @ApiProperty({ type: [AdminResponseDTO] })
  @Expose()
  @Type(() => AdminResponseDTO)
  admin?: AdminResponseDTO;

  @ApiProperty({ type: [ConsumerResponseDTO] })
  @Expose()
  @Type(() => ConsumerResponseDTO)
  consumer?: ConsumerResponseDTO;

  @ApiProperty({ type: [RestaurantResponseDTO] })
  @Expose()
  @Type(() => RestaurantResponseDTO)
  restaurant?: RestaurantResponseDTO;
}
