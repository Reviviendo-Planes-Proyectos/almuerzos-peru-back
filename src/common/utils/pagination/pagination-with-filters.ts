import { Repository, SelectQueryBuilder } from 'typeorm';
import { SearchParams } from '../../../core/domain/dto/search/search-param';

export async function paginateWithFilters<T>(repository: Repository<T>, searchParams: SearchParams) {
  const { page = 1, limit = 10, select = [], relations = {}, where = {}, order = {} } = searchParams;

  const alias = repository.metadata.tableName;
  const qb: SelectQueryBuilder<T> = repository.createQueryBuilder(alias);

  // SELECT de la entidad principal
  if (Array.isArray(select) && select.length) {
    qb.select(select.map((field) => `${alias}.${field}`));
  }

  // RELATIONS con campos seleccionados
  if (relations && typeof relations === 'object') {
    Object.entries(relations).forEach(([relation, fields]) => {
      const relationAlias = `${relation}`;
      qb.leftJoin(`${alias}.${relation}`, relationAlias);
      if (Array.isArray(fields) && fields.length) {
        fields.forEach((field) => {
          qb.addSelect(`${relationAlias}.${field}`);
        });
      }
    });
  }

  // WHERE simple y anidado
  if (where && typeof where === 'object') {
    Object.entries(where).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value) && 'op' in value) {
        const { op, value: val } = value as { op: string; value: any };
        switch (op) {
          case 'like':
            qb.andWhere(`${alias}.${key} LIKE :${key}`, { [key]: `%${val}%` });
            break;
          case 'gte':
            qb.andWhere(`${alias}.${key} >= :${key}`, { [key]: val });
            break;
          case 'lte':
            qb.andWhere(`${alias}.${key} <= :${key}`, { [key]: val });
            break;
          default:
            qb.andWhere(`${alias}.${key} = :${key}`, { [key]: val });
        }
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          if (typeof nestedValue === 'object' && nestedValue !== null && 'op' in nestedValue) {
            const { op, value: val } = nestedValue as { op: string; value: any };
            switch (op) {
              case 'like':
                qb.andWhere(`${key}.${nestedKey} LIKE :${key}_${nestedKey}`, {
                  [`${key}_${nestedKey}`]: `%${val}%`
                });
                break;
              case 'gte':
                qb.andWhere(`${key}.${nestedKey} >= :${key}_${nestedKey}`, {
                  [`${key}_${nestedKey}`]: val
                });
                break;
              case 'lte':
                qb.andWhere(`${key}.${nestedKey} <= :${key}_${nestedKey}`, {
                  [`${key}_${nestedKey}`]: val
                });
                break;
              default:
                qb.andWhere(`${key}.${nestedKey} = :${key}_${nestedKey}`, {
                  [`${key}_${nestedKey}`]: val
                });
            }
          } else {
            qb.andWhere(`${key}.${nestedKey} = :${key}_${nestedKey}`, {
              [`${key}_${nestedKey}`]: nestedValue
            });
          }
        });
      } else {
        qb.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
      }
    });
  }

  // ORDER BY
  if (order && typeof order === 'object') {
    Object.entries(order).forEach(([key, direction]) => {
      if (key.includes('.')) {
        qb.addOrderBy(key, direction);
      } else {
        qb.addOrderBy(`${alias}.${key}`, direction);
      }
    });
  }

  // PAGINACIÓN
  qb.skip((page - 1) * limit).take(limit);

  const [data, total] = await qb.getManyAndCount();

  const lastPage = Math.ceil(total / limit);
  const nextPage = page < lastPage ? page + 1 : null;
  console.log(data);
  return {
    data,
    paginationData: {
      total,
      currentPage: page,
      lastPage,
      nextPage,
      perPage: limit
    }
  };
}
