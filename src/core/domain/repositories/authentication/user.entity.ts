import { UserAuthentication } from '../../dto/authentication/user.authentication.dto';
import { UserProfile } from '../../dto/user/user.profile.dto';

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
  imageUrl?: string;
  district: string;
  province: string;
  description?: string;
  role: 'admin' | 'consumer';
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
    public imageUrl: string | undefined,
    public district: string,
    public province: string,
    public description: string | undefined,
    public role: 'admin' | 'consumer',
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
    imageUrl?: string;
  }): UserAuthentication {
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
      imageUrl: data.imageUrl?.trim()
    };
  }

  static createUserProfile(data: {
    dni: string;
    firstName: string;
    lastName: string;
    phone: string;
    district: string;
    province: string;
    role: 'admin' | 'consumer';
    description?: string;
  }): UserProfile {
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
    if (!['admin', 'consumer'].includes(data.role)) {
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
      description: data.description?.trim()
    };
  }
}
