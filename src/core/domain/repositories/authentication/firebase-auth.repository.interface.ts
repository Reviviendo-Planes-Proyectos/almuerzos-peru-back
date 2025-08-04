import { UserAuthentication } from '../../dto/authentication/user.authentication.dto';

export interface IFirebaseAuthRepository {
  saveUser(user: UserAuthentication): Promise<UserAuthentication>;
  findUserBySub(sub: string): Promise<UserAuthentication | null>;
  generateJWT(user: UserAuthentication): string;
  decodedUserFromFirebase(token: string): Promise<UserAuthentication>;
  getAllUsers(): Promise<UserAuthentication[]>;
}
