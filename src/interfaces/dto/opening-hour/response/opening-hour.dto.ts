import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OpeningHourDTO {
  @ApiProperty({ example: 1, description: 'Día de la semana (1 = Lunes, ..., 7 = Domingo)' })
  @Expose({ name: 'week_day' })
  weekDay: number;

  @ApiProperty({ example: '08:00', required: false })
  @Expose({ name: 'start_time' })
  startTime?: string;

  @ApiProperty({ example: '18:00', required: false })
  @Expose({ name: 'end_time' })
  endTime?: string;

  @ApiProperty({ example: true })
  @Expose()
  enabled: boolean;
}
