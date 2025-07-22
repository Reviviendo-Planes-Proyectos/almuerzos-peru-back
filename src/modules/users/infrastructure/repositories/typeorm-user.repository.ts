import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/user.repository.interface';
import { IUser } from '../../domain/user.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user || null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || null;
  }

  async create(userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async update(id: number, userData: Partial<IUser>): Promise<IUser | null> {
    await this.userRepository.update(id, userData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.userRepository.count({ where: { id } });
    return count > 0;
  }
}
