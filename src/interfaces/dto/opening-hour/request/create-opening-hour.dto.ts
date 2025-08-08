import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateOpeningHourDto {
  @ApiProperty({
    example: 1,
    description: 'Día de la semana (1=lunes, ..., 7=domingo)',
    name: 'week_day'
  })
  @IsNumber()
  @Min(1)
  @Max(7)
  @Expose({ name: 'week_day' })
  weekDay: number;

  @ApiProperty({
    example: '08:00',
    description: 'Hora de apertura (formato HH:mm)',
    required: false,
    name: 'start_time'
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'start_time' })
  startTime?: string;

  @ApiProperty({
    example: '18:00',
    description: 'Hora de cierre (formato HH:mm)',
    required: false,
    name: 'end_time'
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'end_time' })
  endTime?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si ese día está habilitado'
  })
  @IsBoolean()
  enabled: boolean;
}
