import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/database/entities/authentication/user.entity';
import { UserServiceCommon } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserServiceCommon],
  exports: [UserServiceCommon]
})
export class UserCommonModule {}
