import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceCommon } from './user.service';
import { UserEntity } from '../../infrastructure/database/entities/authentication/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserServiceCommon],
  exports: [UserServiceCommon]
})
export class UserCommonModule {}
