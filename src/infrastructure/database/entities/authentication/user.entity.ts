import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'enum', enum: ['admin', 'consumer'], nullable: true })
  role: 'admin' | 'consumer';

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAt: Date;
}
