import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { AdminEntity } from '../admin/admin.entity';
import { ConsumerEntity } from '../consumer/consumer.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => RestaurantEntity, (restaurant) => restaurant.user, { cascade: true })
  restaurant?: RestaurantEntity;

  @OneToOne(() => AdminEntity, (admin) => admin.user)
  admin?: AdminEntity;

  @OneToOne(() => ConsumerEntity, (consumer) => consumer.user)
  consumer?: ConsumerEntity;

  @Column()
  username: string;

  @Column({ unique: true })
  sub: string;

  @Column({ default: true, name: 'email_verified' })
  emailVerified: boolean;

  @Column({ name: 'provider_id' })
  providerId: string;

  @Column({ length: 8, unique: true, type: 'char', nullable: true })
  dni: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ unique: true, length: 9, type: 'char', nullable: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl?: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  province: string;

  @Column({ type: 'enum', enum: ['admin', 'consumer', 'restaurant'], nullable: true })
  role: 'admin' | 'consumer' | 'restaurant';

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAt: Date;
}
