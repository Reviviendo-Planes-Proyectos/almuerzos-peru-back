export interface SearchParams {
  page?: number;
  limit?: number;
  select?: string[];
  relations?: string[] | Record<string, string[] | boolean>;
  where?: Record<
    string,
    string | number | boolean | { op: 'eq' | 'like' | 'gte' | 'lte'; value: string | number | boolean }
  >;
  order?: Record<string, 'ASC' | 'DESC'>;
}
