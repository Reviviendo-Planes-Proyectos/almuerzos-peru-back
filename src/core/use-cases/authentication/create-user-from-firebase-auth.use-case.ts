import { AuthResponseDto } from '../../../interfaces/dto/authentication/response/response-auth-user.dto';
import { User } from '../../domain/repositories/authentication/user.entity';
import { IFirebaseAuthRepository } from 'src/core/domain/repositories/authentication/firebase-auth.repository.interface';

export class CreateUserFromFirebaseAuthUseCase {
  constructor(private readonly firebaseAuthRepository: IFirebaseAuthRepository) {}

  async execute(token: string): Promise<AuthResponseDto> {
    const decodedUser = await this.firebaseAuthRepository.decodedUserFromFirebase(token);
    let user = await this.firebaseAuthRepository.findUserBySub(decodedUser.sub);
    if (!user) {
      user = await this.firebaseAuthRepository.saveUser(User.createAuthentication(decodedUser));
    }
    const jwt = this.firebaseAuthRepository.generateJWT(user);
    return {
      token: jwt,
      user: {
        username: user.username,
        email: user.email,
        providerId: user.providerId,
        imageUrl: user.imageUrl
      }
    };
  }
}
