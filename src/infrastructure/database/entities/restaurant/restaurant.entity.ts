import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../authentication/user.entity';
import { OpeningHourEntity } from '../opening-hour/openings-hours.entity';

@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.restaurant)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => OpeningHourEntity, (hour) => hour.restaurant, {
    cascade: true,
    eager: false
  })
  openingHour?: OpeningHourEntity[];

  @Column()
  name: string;

  @Column({ name: 'maps_address' })
  mapsAddress: string;

  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'double precision' })
  longitude: number;

  @Column({ length: 11, type: 'char', unique: true, nullable: true })
  ruc: string;

  @Column({ name: 'legal_name', nullable: true })
  legalName: string;

  @Column({ length: 9, nullable: true, name: 'whatsapp_orders' })
  whatsappOrders: string;

  @Column({ length: 9, name: 'yape_phone', nullable: true })
  yapePhone: string;

  @Column({ name: 'logo_url', nullable: true })
  logoUrl: string;

  @Column({ name: 'banner_url', nullable: true })
  bannerUrl: string;

  @Column({ name: 'diner_in' })
  dinerIn: boolean;

  @Column()
  delivery: boolean;

  @Column({ default: 0, type: 'decimal', precision: 2, scale: 1, name: 'average_rating' })
  averageRating: number;

  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAt: Date;
}
