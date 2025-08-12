import { RestaurantDTO } from '../restaurant/restaurant.dto';

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  sub: string;
  emailVerified: boolean;
  providerId: string;
  dni: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture?: string;
  district: string;
  province: string;
  description?: string;
  role: 'admin' | 'consumer' | 'restaurant';
  restaurant?: RestaurantDTO;
  admin?: any;
  consumer?: any;
}
