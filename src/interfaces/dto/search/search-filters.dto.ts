import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsArray, IsString, IsObject } from 'class-validator';

export class SearchUserDto {
  @ApiPropertyOptional({
    description: 'Campos específicos a seleccionar de la entidad',
    example: ['id', 'name', 'email'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  select?: string[];

  @ApiPropertyOptional({
    description: 'Relaciones a cargar. Puede ser un array simple o un objeto anidado',
    example: {
      restaurant: ['id', 'name', 'address'],
      admin: ['isDeleted'],
      consumer: ['userName', 'isDeleted']
    }
  })
  @IsOptional()
  relations?: string[] | Record<string, string[] | boolean>;

  @ApiPropertyOptional({
    description: 'Filtros de búsqueda',
    example: {
      name: { op: 'like', value: 'John' },
      age: { op: 'gte', value: 18 },
      active: true
    },
    type: Object
  })
  @IsOptional()
  @IsObject()
  where?: Record<
    string,
    string | number | boolean | { op: 'eq' | 'like' | 'gte' | 'lte'; value: string | number | boolean }
  >;

  @ApiPropertyOptional({
    description: 'Orden de los resultados',
    example: { createdAt: 'DESC' },
    type: Object
  })
  @IsOptional()
  @IsObject()
  order?: Record<string, 'ASC' | 'DESC'>;
}
