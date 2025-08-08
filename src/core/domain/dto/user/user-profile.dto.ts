import { RestaurantDTO } from '../restaurant/restaurant.dto';

export interface UserProfileDTO {
  dni: string;
  firstName: string;
  lastName: string;
  phone: string;
  district: string;
  province: string;
  role: 'admin' | 'consumer' | 'restaurant';
  description?: string;
  profilePicture?: string;
  restaurant?: RestaurantDTO;
  admin?: any;
  consumer?: any;
}
