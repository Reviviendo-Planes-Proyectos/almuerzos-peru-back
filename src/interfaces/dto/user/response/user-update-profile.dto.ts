import { Expose, Type } from 'class-transformer';
import { RestaurantResponseDTO } from '../../restaurant/response/restaurant.dto';
import { AdminResponseDTO, ConsumerResponseDTO } from './user-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateProfileDTO {
  @ApiProperty({ example: '12344456789' })
  @Expose()
  phone: string;

  @ApiProperty({ example: 'Los Olivos' })
  @Expose()
  district: string;

  @ApiProperty({ example: 'Lima' })
  @Expose()
  province: string;

  @ApiProperty({ example: 'Descripcion del usuario ...' })
  @Expose()
  description?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png' })
  @Expose()
  profilePicture?: string;

  @ApiProperty({ type: [RestaurantResponseDTO] })
  @Expose()
  @Type(() => RestaurantResponseDTO)
  restaurant?: RestaurantResponseDTO;

  @ApiProperty({ type: [ConsumerResponseDTO] })
  @Expose()
  @Type(() => ConsumerResponseDTO)
  consumer?: ConsumerResponseDTO;

  @ApiProperty({ type: [AdminResponseDTO] })
  @Expose()
  @Type(() => AdminResponseDTO)
  admin?: AdminResponseDTO;
}
