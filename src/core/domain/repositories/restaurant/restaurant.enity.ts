import { OpeningHour } from '../opening-hour/opening-hour.entity';

export interface IRestaurant {
  name: string;
  mapsAddress: string;
  referentialAddress: string;
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
  openingHour?: OpeningHour[];
}

export class Restaurant implements IRestaurant {
  constructor(
    public name: string,
    public mapsAddress: string,
    public referentialAddress: string,
    public latitude: number,
    public longitude: number,
    public ruc?: string,
    public legalName?: string,
    public whatsappOrders?: string,
    public yapePhone?: string,
    public logoUrl?: string,
    public bannerUrl?: string,
    public dinerIn: boolean = false,
    public delivery: boolean = false,
    public openingHour?: OpeningHour[]
  ) {}
}
