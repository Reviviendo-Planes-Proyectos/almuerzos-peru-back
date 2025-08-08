import { IUserProfileRepository } from '../../domain/repositories/user/user.repository.interface';
import { RegisterUserProfileDto } from '../../../interfaces/dto/user/request/create-user-profile.dto';
import { UserRegisterProfileDTO } from '../../../interfaces/dto/user/response/user-profile.dto';
import { User } from '../../domain/repositories/authentication/user.entity';

export class UserCreateProfileUseCase {
  constructor(private readonly userProfileRepository: IUserProfileRepository) {}
  async execute(sub: string, registerProfileDTO: RegisterUserProfileDto): Promise<UserRegisterProfileDTO> {
    const user = User.createUserProfile(registerProfileDTO);
    return await this.userProfileRepository.registerInfoUser(sub, user);
  }
}
