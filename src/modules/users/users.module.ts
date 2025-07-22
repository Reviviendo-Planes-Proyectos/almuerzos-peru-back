import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { UsersUseCases } from './application/users.use-cases';
import { UsersController } from './infrastructure/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersUseCases,
    {
      provide: 'IUserRepository',
      useClass: TypeOrmUserRepository
    }
  ],
  exports: [UsersUseCases, 'IUserRepository']
})
export class UsersModule {}
