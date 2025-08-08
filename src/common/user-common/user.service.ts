import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/database/entities/authentication/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserServiceCommon {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async userExistBySub(sub: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { sub: sub } });
    return !!user;
  }
}
