import { UserProfile } from '../../dto/user/user.profile.dto';

export interface IUserProfileRepository {
  registerInfoUser(sub: string, user: Omit<UserProfile, 'imageUrl'>): Promise<UserProfile>;
}
