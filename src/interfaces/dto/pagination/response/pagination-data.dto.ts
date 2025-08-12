import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationDataDTO {
  @ApiProperty({ example: 10 })
  @Expose()
  total: number;

  @ApiProperty({ example: 1 })
  @Expose()
  currentPage: number;

  @ApiProperty({ example: 9 })
  @Expose()
  lastPage: number;

  @ApiProperty({ example: 3 })
  @Expose()
  nextPage: number;

  @ApiProperty({ example: 10 })
  @Expose()
  perPage: number;
}
