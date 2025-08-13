import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateOpeningHourDto } from '../../opening-hour/request/create-opening-hour.dto';
import { Expose, Type } from 'class-transformer';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Mi Restaurante', description: 'Nombre del restaurante' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Av. Los Próceres 123',
    description: 'Dirección en Google Maps',
    name: 'maps_address'
  })
  @IsString()
  @Expose({ name: 'maps_address' })
  mapsAddress: string;

  @ApiProperty({
    example: 'Frente al parque central, al lado del banco',
    description: 'Dirección de referencia',
    required: false,
    name: 'referential_address'
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'referential_address' })
  referentialAddress?: string;

  @ApiProperty({ example: -12.04318, description: 'Latitud geográfica' })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ example: -77.02824, description: 'Longitud geográfica' })
  @IsLongitude()
  longitude: number;

  @ApiProperty({ example: '20123456789', description: 'RUC del restaurante', required: false })
  @IsOptional()
  @IsString()
  ruc?: string;

  @ApiProperty({
    example: 'Mi Empresa S.A.C.',
    description: 'Razón social',
    required: false,
    name: 'legal_name'
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'legal_name' })
  legalName?: string;

  @ApiProperty({ example: '987654321', description: 'Número de WhatsApp', required: false })
  @IsOptional()
  @IsString()
  @Expose({ name: 'whatsapp_orders' })
  whatsappOrders?: string;

  @ApiProperty({
    example: '987654321',
    description: 'Número de Yape',
    required: false,
    name: 'yape_phone'
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'yape_phone' })
  yapePhone?: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'URL del logo',
    required: false,
    name: 'logo_url'
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'logo_url' })
  logoUrl?: string;

  @ApiProperty({
    example: 'https://example.com/banner.png',
    description: 'URL del banner',
    required: false,
    name: 'banner_url'
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'banner_url' })
  bannerUrl?: string;

  @ApiProperty({
    example: true,
    description: '¿Atiende en el local?',
    name: 'diner_in'
  })
  @IsBoolean()
  @Expose({ name: 'diner_in' })
  dinerIn: boolean;

  @ApiProperty({ example: true, description: '¿Ofrece delivery?' })
  @IsBoolean()
  delivery: boolean;

  @ApiProperty({
    type: [CreateOpeningHourDto],
    description: 'Horarios de apertura por día',
    required: false,
    name: 'opening_hour'
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOpeningHourDto)
  @Expose({ name: 'opening_hour' })
  openingHour?: CreateOpeningHourDto[];
}
