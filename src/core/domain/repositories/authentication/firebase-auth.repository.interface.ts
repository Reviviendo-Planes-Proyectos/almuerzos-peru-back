import { UserAuthenticationDTO } from '../../dto/authentication/user.authentication.dto';

export interface IFirebaseAuthRepository {
  saveUser(user: UserAuthenticationDTO): Promise<UserAuthenticationDTO>;
  findUserBySub(sub: string): Promise<UserAuthenticationDTO | null>;
  generateJWT(user: UserAuthenticationDTO): string;
  decodedUserFromFirebase(token: string): Promise<UserAuthenticationDTO>;
  getAllUsers(): Promise<UserAuthenticationDTO[]>;
}
