import { OpeningHour } from '../opening-hour/opening-hour.entity';

export interface IRestaurant {
  name: string;
  mapsAddress: string;
  latitude: number;
  longitude: number;
  ruc?: string;
  legalName?: string;
  whatsapp?: string;
  yapePhone?: string;
  logoUrl?: string;
  bannerUrl?: string;
  dineIn: boolean;
  delivery: boolean;
  openingHour?: OpeningHour[];
}

export class Restaurant implements IRestaurant {
  constructor(
    public name: string,
    public mapsAddress: string,
    public latitude: number,
    public longitude: number,
    public ruc?: string,
    public legalName?: string,
    public whatsapp?: string,
    public yapePhone?: string,
    public logoUrl?: string,
    public bannerUrl?: string,
    public dineIn: boolean = false,
    public delivery: boolean = false,
    public openingHour?: OpeningHour[]
  ) {}
}
