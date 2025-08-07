import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OpeningHourDTO } from '../../opening-hour/response/opening-hour.dto';

export class RestaurantDTO {
  @ApiProperty({ example: 'Mi Restaurante Saludable' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123, Lima' })
  @Expose({ name: 'maps_address' })
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
  @Expose({ name: 'legal_name' })
  legalName?: string;

  @ApiProperty({ example: '987654321', required: false })
  @Expose()
  whatsapp?: string;

  @ApiProperty({ example: '987654321', required: false })
  @Expose({ name: 'yape_phone' })
  yapePhone?: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @Expose({ name: 'logo_url' })
  logoUrl?: string;

  @ApiProperty({ example: 'https://example.com/banner.jpg', required: false })
  @Expose({ name: 'banner_url' })
  bannerUrl?: string;

  @ApiProperty({ example: true })
  @Expose({ name: 'dine_in' })
  dineIn: boolean;

  @ApiProperty({ example: true })
  @Expose()
  delivery: boolean;

  @ApiProperty({ type: [OpeningHourDTO], required: false })
  @Type(() => OpeningHourDTO)
  @Expose({ name: 'opening_hour' })
  openingHour?: OpeningHourDTO[];
}
