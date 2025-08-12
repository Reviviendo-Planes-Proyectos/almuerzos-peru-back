import { UpdateUserProfileDTO } from '../../../interfaces/dto/user/request/update-user-profile.dto';
import { UserUpdateProfileDTO } from '../../../interfaces/dto/user/response/user-update-profile.dto';
import { IUserProfileRepository } from '../../domain/repositories/user/user.repository.interface';

export class UpdateUserProfileUseCase {
  constructor(private readonly userRepository: IUserProfileRepository) {}
  async execute(sub: string, userData: UpdateUserProfileDTO): Promise<UserUpdateProfileDTO> {
    const user = await this.userRepository.updateUserProfile(sub, userData);
    return user;
  }
}
