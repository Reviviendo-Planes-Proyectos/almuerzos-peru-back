import { RestaurantDTO } from '../restaurant/restaurant.dto';

export interface UpdateUserProfileDTO {
  phone: string;
  district: string;
  province: string;
  description?: string;
  profilePicture?: string;
  restaurant?: RestaurantDTO;
  consumer?: {
    userName: string;
  };
  admin?: any;
}
