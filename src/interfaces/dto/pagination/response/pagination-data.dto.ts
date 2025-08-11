import { Expose } from 'class-transformer';

export class PaginationDataDTO {
  @Expose()
  total: number;

  @Expose()
  currentPage: number;

  @Expose()
  lastPage: number;

  @Expose()
  nextPage: number;

  @Expose()
  perPage: number;
}
