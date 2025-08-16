import { PaginationResult } from '../../dto/pagination/pagination.result.dto';
import { PaginationQueryParamDTO } from '../../dto/pagination/pagintion-query-param.dto';
import { SearchParams } from '../../dto/search/search-param';
import { UpdateUserProfileDTO } from '../../dto/user/update-user-profile.dto';
import { UserProfileDTO } from '../../dto/user/user-profile.dto';
import { UserDTO } from '../../dto/user/user.dto';

export interface IUserProfileRepository {
  registerInfoUser(sub: string, user: Omit<UserProfileDTO, 'imageUrl'>): Promise<UserProfileDTO>;
  getAllUsers(params: PaginationQueryParamDTO, filters: SearchParams): Promise<PaginationResult<UserDTO>>;
  deleteUser(id: number): Promise<boolean>;
  updateUserProfile(sub: string, user: UpdateUserProfileDTO): Promise<UpdateUserProfileDTO>;
}
