export interface PaginationResult<T> {
  data: T[];
  paginationData: {
    total: number;
    currentPage: number;
    lastPage: number;
    nextPage: number;
    perPage: number;
  };
}
