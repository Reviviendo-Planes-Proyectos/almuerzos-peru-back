import { IUser } from 'src/core/domain/repositories/authentication/user.entity';

export interface IGoogleAuthRepository {
  saveUser(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser>;
  findUserBySub(sub: string): Promise<IUser | null>;
  generateJWT(user: IUser): string;
  decodedUserFromGoogle(token: string): Promise<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>;
}
