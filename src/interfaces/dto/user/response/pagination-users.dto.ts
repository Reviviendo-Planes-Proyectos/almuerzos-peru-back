import { Expose, Type } from 'class-transformer';
import { PaginationDataDTO } from '../../pagination/response/pagination-data.dto';
import { UserResponseDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseUsers {
  @ApiProperty({ type: [UserResponseDto] })
  @Expose()
  @Type(() => UserResponseDto)
  data: UserResponseDto[];

  @ApiProperty({ type: [PaginationDataDTO] })
  @Expose()
  @Type(() => PaginationDataDTO)
  paginationData: PaginationDataDTO;
}
