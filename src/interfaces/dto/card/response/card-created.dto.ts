import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CardCreatedDTO {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Bebidas' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Descripcion de la carta ...' })
  @Expose()
  description?: string;

  @ApiProperty({ example: true })
  @Expose()
  isActive: boolean;
}
