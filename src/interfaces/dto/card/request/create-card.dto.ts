import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDTO {
  @ApiProperty({ example: 'Mariscos' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Descripcion de la carta...' })
  @IsOptional()
  @IsString()
  description?: string;
}
