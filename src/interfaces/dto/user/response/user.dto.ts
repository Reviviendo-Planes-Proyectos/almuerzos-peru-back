import { Expose, Type } from 'class-transformer';
import { RestaurantResponseDTO } from '../../restaurant/response/restaurant.dto';
import { AdminResponseDTO, ConsumerResponseDTO } from './user-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Luis Fernando' })
  @Expose()
  username: string;

  @ApiProperty({ example: '12nbb1io2o' })
  @Expose()
  sub: string;

  @ApiProperty({ example: true })
  @Expose()
  emailVerified: boolean;

  @ApiProperty({ example: 'google.com' })
  @Expose()
  providerId: string;

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

  @ApiProperty({ example: 'email@gmail.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'https://example.com/avatar.png' })
  @Expose()
  profilePicture?: string;

  @ApiProperty({ example: 'Los Olivos' })
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

  @Expose()
  @Type(() => RestaurantResponseDTO)
  restaurant?: RestaurantResponseDTO;

  @Expose()
  @Type(() => AdminResponseDTO)
  admin?: AdminResponseDTO;

  @Expose()
  @Type(() => ConsumerResponseDTO)
  consumer?: ConsumerResponseDTO;
}
