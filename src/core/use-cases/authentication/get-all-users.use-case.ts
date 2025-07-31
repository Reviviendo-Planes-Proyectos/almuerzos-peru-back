import { IGoogleAuthRepository } from 'src/core/domain/repositories/authentication/google-auth.repository.interface';
import { AuthUserDto } from 'src/interfaces/dto/authentication/response/response-auth-user.dto';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IGoogleAuthRepository) {}

  async execute(): Promise<AuthUserDto[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map((user) => ({
      username: user.username,
      email: user.email,
      providerId: user.providerId,
      imageUrl: user.imageUrl || undefined
    }));
  }
}
