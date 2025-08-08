import { UserAuthenticationDTO } from '../../dto/authentication/user.authentication.dto';
import { UserProfileDTO } from '../../dto/user/user-profile.dto';
import { IAdmin } from '../admin/admin.entity';
import { IConsumer } from '../consumer/consumer.entity';
import { IRestaurant } from '../restaurant/restaurant.enity';

export interface IUser {
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
  restaurant?: IRestaurant;
  admin?: IAdmin;
  consumer?: IConsumer;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deleteAt: Date;
}
export class User implements IUser {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public sub: string,
    public emailVerified: boolean,
    public providerId: string,
    public dni: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public profilePicture: string | undefined,
    public district: string,
    public province: string,
    public description: string | undefined,
    public role: 'admin' | 'consumer' | 'restaurant',
    public restaurant: IRestaurant | undefined,
    public admin: IAdmin | undefined,
    public consumer: IConsumer | undefined,
    public isDeleted: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public deleteAt: Date
  ) {}

  static createAuthentication(data: {
    username: string;
    email: string;
    sub: string;
    emailVerified?: boolean;
    providerId: string;
    profilePicture?: string;
  }): UserAuthenticationDTO {
    if (!data.email?.includes('@')) {
      throw new Error('Email must be valid');
    }
    if (!data.username?.trim()) {
      throw new Error('Username is required');
    }
    if (!data.sub?.trim()) {
      throw new Error('Sub is required');
    }
    if (!data.providerId?.trim()) {
      throw new Error('ProviderId is required');
    }

    return {
      username: data.username.trim(),
      email: data.email.toLowerCase().trim(),
      sub: data.sub.trim(),
      emailVerified: data.emailVerified ?? false,
      providerId: data.providerId.trim(),
      profilePicture: data.profilePicture?.trim()
    };
  }

  static createUserProfile(data: UserProfileDTO): UserProfileDTO {
    if (!data.dni?.trim()) {
      throw new Error('DNI is required');
    }
    if (!data.firstName?.trim()) {
      throw new Error('First name is required');
    }
    if (!data.lastName?.trim()) {
      throw new Error('Last name is required');
    }
    if (!data.phone?.trim()) {
      throw new Error('Phone is required');
    }
    if (!data.district?.trim()) {
      throw new Error('District is required');
    }
    if (!data.province?.trim()) {
      throw new Error('Province is required');
    }
    if (!['admin', 'consumer', 'restaurant'].includes(data.role)) {
      throw new Error('Invalid role');
    }
    return {
      dni: data.dni.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.trim(),
      district: data.district.trim(),
      province: data.province.trim(),
      role: data.role,
      description: data.description?.trim() || '',
      profilePicture: data.profilePicture?.trim(),
      restaurant: data.restaurant,
      admin: data.admin,
      consumer: data.consumer
    };
  }
}
