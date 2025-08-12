import { PaginationQueryParamDTO } from '../../../interfaces/dto/pagination/request/pagination-query-param.dto';
import { SearchUserDto } from '../../../interfaces/dto/search/search-filters.dto';
import { PaginationResponseUsers } from '../../../interfaces/dto/user/response/pagination-users.dto';
import { IUserProfileRepository } from '../../domain/repositories/user/user.repository.interface';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserProfileRepository) {}
  async execute(params: PaginationQueryParamDTO, filters: SearchUserDto): Promise<PaginationResponseUsers> {
    const users = await this.userRepository.getAllUsers(params, filters);
    return users;
  }
}
