import { OpeningHourDTO } from '../opening-hour/opening-hour.dto';

export interface RestaurantDTO {
  name: string;
  mapsAddress: string;
  referentialAddress?: string;
  latitude: number;
  longitude: number;
  ruc?: string;
  legalName?: string;
  whatsappOrders?: string;
  yapePhone?: string;
  logoUrl?: string;
  bannerUrl?: string;
  dinerIn: boolean;
  delivery: boolean;
  openingHour?: OpeningHourDTO[];
}
