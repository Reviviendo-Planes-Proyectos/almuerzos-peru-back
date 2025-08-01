import { AuthResponseDto } from '../../../interfaces/dto/authentication/response/response-auth-user.dto';
import { User } from '../../domain/repositories/authentication/user.entity';
import { IFirebaseAuthRepository } from 'src/core/domain/repositories/authentication/firebase-auth.repository.interface';

export class CreateUserFromFirebaseAuthUseCase {
  constructor(private readonly googleAuthRepository: IFirebaseAuthRepository) {}

  async execute(token: string): Promise<AuthResponseDto> {
    const decodedUser = await this.googleAuthRepository.decodedUserFromFirebase(token);
    let user = await this.googleAuthRepository.findUserBySub(decodedUser.sub);
    if (!user) {
      user = await this.googleAuthRepository.saveUser(User.create(decodedUser));
    }
    const jwt = this.googleAuthRepository.generateJWT(user);
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
