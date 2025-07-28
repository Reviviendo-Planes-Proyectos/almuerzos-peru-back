import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/domain/repositories/user/user.entity';
import { UserUseCases } from 'src/core/use-cases/user/user.use-cases';
import { TypeOrmUserRepository } from 'src/infrastructure/database/typeorm-user.repository';
import { UserController } from 'src/interfaces/controllers/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserUseCases,
    {
      provide: 'IUserRepository',
      useClass: TypeOrmUserRepository
    }
  ],
  exports: [UserUseCases, 'IUserRepository']
})
export class UsersModule {}
