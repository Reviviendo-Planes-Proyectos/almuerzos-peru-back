import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  select?: string[];

  @IsOptional()
  relations?: string[] | Record<string, string[] | boolean>;

  @IsOptional()
  @IsObject()
  where?: Record<
    string,
    string | number | boolean | { op: 'eq' | 'like' | 'gte' | 'lte'; value: string | number | boolean }
  >;

  @IsOptional()
  @IsObject()
  order?: Record<string, 'ASC' | 'DESC'>;
}
