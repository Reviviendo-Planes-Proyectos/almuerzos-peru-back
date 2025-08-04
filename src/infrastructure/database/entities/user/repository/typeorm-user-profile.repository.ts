import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/core/domain/dto/user/user.profile.dto';
import { IUserProfileRepository } from 'src/core/domain/repositories/user/user.repository.interface';
import { UserEntity } from '../../authentication/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmUserProfile implements IUserProfileRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async registerInfoUser(sub: string, user: UserProfile): Promise<UserProfile> {
    await this.userRepository.update({ sub: sub }, user);
    const updatedUser = await this.userRepository.findOneBy({ sub: sub });
    return updatedUser;
  }
}
