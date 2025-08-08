import { UserProfileDTO } from '../../dto/user/user-profile.dto';

export interface IUserProfileRepository {
  registerInfoUser(sub: string, user: Omit<UserProfileDTO, 'imageUrl'>): Promise<UserProfileDTO>;
}
