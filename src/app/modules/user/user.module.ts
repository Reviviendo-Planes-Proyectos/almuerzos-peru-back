import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtProviderModule } from 'src/common/jwt/jwt.module';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';
import { UserCommonModule } from 'src/common/user-common/user-common.module';
import { UserCreateProfileUseCase } from 'src/core/use-cases/user/user-create-profile.use-case';
import { UserEntity } from 'src/infrastructure/database/entities/authentication/user.entity';
import { TypeOrmUserProfile } from 'src/infrastructure/database/entities/user/repository/typeorm-user-profile.repository';
import { UserController } from 'src/interfaces/controllers/user/user.controller';

const useCases = [UserCreateProfileUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserCommonModule, JwtProviderModule],
  providers: [
    JwtStrategy,
    TypeOrmUserProfile,
    ...useCases.map((useCase) => ({
      provide: useCase,
      useFactory: (userRepo: TypeOrmUserProfile) => new useCase(userRepo),
      inject: [TypeOrmUserProfile]
    }))
  ],
  controllers: [UserController]
})
export class UserModule {}
