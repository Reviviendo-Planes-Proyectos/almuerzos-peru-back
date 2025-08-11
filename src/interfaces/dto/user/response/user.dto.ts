import { Expose, Type } from 'class-transformer';
import { RestaurantResponseDTO } from '../../restaurant/response/restaurant.dto';
import { AdminResponseDTO, ConsumerResponseDTO } from './user-profile.dto';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  sub: string;

  @Expose()
  emailVerified: boolean;

  @Expose()
  providerId: string;

  @Expose()
  dni: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  profilePicture?: string;

  @Expose()
  district: string;

  @Expose()
  province: string;

  @Expose()
  role: 'admin' | 'consumer' | 'restaurant';

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
