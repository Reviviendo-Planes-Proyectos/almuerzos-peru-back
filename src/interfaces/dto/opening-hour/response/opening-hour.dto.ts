import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OpeningHourDTO {
  @ApiProperty({ example: 1, description: 'Día de la semana (1 = Lunes, ..., 7 = Domingo)' })
  @Expose()
  weekDay: number;

  @ApiProperty({ example: '08:00', required: false })
  @Expose()
  startTime?: string;

  @ApiProperty({ example: '18:00', required: false })
  @Expose()
  endTime?: string;

  @ApiProperty({ example: true })
  @Expose()
  enabled: boolean;
}
