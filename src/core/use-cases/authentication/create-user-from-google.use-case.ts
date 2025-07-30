import { IGoogleAuthRepository } from '../../domain/repositories/authentication/google-auth.repository.interface';
import { AuthResponseDto } from '../../../interfaces/dto/authentication/response/response-auth-user.dto';
import { User } from '../../../core/domain/repositories/authentication/user.entity';

export default class CreateUserFromGoogleUseCase {
  constructor(private readonly googleAuthRepository: IGoogleAuthRepository) {}

  async execute(token: string): Promise<AuthResponseDto> {
    const decodedUser = await this.googleAuthRepository.decodedUserFromGoogle(token);
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
