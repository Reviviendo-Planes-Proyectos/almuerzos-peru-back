import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OpeningHourDTO } from '../../opening-hour/response/opening-hour.dto';

export class RestaurantDTO {
  @ApiProperty({ example: 'Mi Restaurante Saludable' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123, Lima' })
  @Expose()
  mapsAddress: string;

  @ApiProperty({ example: -12.04318 })
  @Expose()
  latitude: number;

  @ApiProperty({ example: -77.02824 })
  @Expose()
  longitude: number;

  @ApiProperty({ example: '20123456789', required: false })
  @Expose()
  ruc?: string;

  @ApiProperty({ example: 'Mi Empresa S.A.C.', required: false })
  @Expose()
  legalName?: string;

  @ApiProperty({ example: '987654321', required: false })
  @Expose()
  whatsappOrders?: string;

  @ApiProperty({ example: '987654321', required: false })
  @Expose()
  yapePhone?: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @Expose()
  logoUrl?: string;

  @ApiProperty({ example: 'https://example.com/banner.jpg', required: false })
  @Expose()
  bannerUrl?: string;

  @ApiProperty({ example: true })
  @Expose()
  dinerIn: boolean;

  @ApiProperty({ example: true })
  @Expose()
  delivery: boolean;

  @ApiProperty({ type: [OpeningHourDTO], required: false })
  @Type(() => OpeningHourDTO)
  @Expose()
  openingHour?: OpeningHourDTO[];
}
