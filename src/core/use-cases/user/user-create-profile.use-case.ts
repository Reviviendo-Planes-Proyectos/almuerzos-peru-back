import { User } from '../../domain/repositories/authentication/user.entity';
import { IUserProfileRepository } from '../../domain/repositories/user/user.repository.interface';
import { RegisterUserProfileDto } from '../../../interfaces/dto/user/request/create-user-profile.dto';
import { UserRegisterProfileDTO } from '../../../interfaces/dto/user/response/user-profile.dto';

export class UserCreateProfileUseCase {
  constructor(private readonly userProfileRepository: IUserProfileRepository) {}
  async execute(sub: string, registerProfileDTO: RegisterUserProfileDto): Promise<UserRegisterProfileDTO> {
    const profile = User.createUserProfile(registerProfileDTO);
    const userProfile = await this.userProfileRepository.registerInfoUser(sub, profile);
    return {
      dni: userProfile.dni,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      phone: userProfile.phone,
      district: userProfile.district,
      province: userProfile.province,
      role: userProfile.role,
      description: userProfile.description,
      imageUrl: userProfile.imageUrl
    };
  }
}
