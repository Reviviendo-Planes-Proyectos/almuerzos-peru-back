import { FindManyOptions, Repository } from 'typeorm';

export async function paginate<T>(
  repo: Repository<T>,
  page: number = 1,
  limit: number = 10,
  options: FindManyOptions<T> = {}
) {
  const skip = (page - 1) * limit;
  const [data, total] = await repo.findAndCount({
    skip,
    take: limit,
    ...options
  });
  const lastPage = Math.ceil(total / limit);
  const nextPage = page < lastPage ? page + 1 : null;
  return {
    data,
    paginationData: {
      total,
      currentPage: page,
      lastPage: lastPage,
      nextPage: nextPage,
      perPage: limit
    }
  };
}
