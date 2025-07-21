import { IUser } from './user.entity';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findById(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(
    userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<IUser>;
  update(id: number, userData: Partial<IUser>): Promise<IUser | null>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>;
}
