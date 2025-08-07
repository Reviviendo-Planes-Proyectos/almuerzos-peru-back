import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';

@Entity('opening_hours')
export class OpeningHourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.openingHour)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity;

  @Column({ type: 'smallint', name: 'week_day' })
  weekDay: number;

  @Column({ type: 'time', name: 'start_time', nullable: true })
  startTime: string;

  @Column({ type: 'time', name: 'end_time', nullable: true })
  endTime: string;

  @Column()
  enabled: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
