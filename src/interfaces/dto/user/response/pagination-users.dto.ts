import { Expose, Type } from 'class-transformer';
import { PaginationDataDTO } from '../../pagination/response/pagination-data.dto';
import { UserResponseDto } from './user.dto';

export class PaginationResponseUsers {
  @Expose()
  @Type(() => UserResponseDto)
  data: UserResponseDto[];

  @Expose()
  @Type(() => PaginationDataDTO)
  paginationData: PaginationDataDTO;
}
