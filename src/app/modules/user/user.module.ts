import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtProviderModule } from '../../../common/jwt/jwt.module';
import { JwtStrategy } from '../../../common/jwt/jwt.strategy';
import { UserCommonModule } from '../../../common/user-common/user-common.module';
import { UserEntity } from '../../../infrastructure/database/entities/authentication/user.entity';
import { RestaurantEntity } from '../../../infrastructure/database/entities/restaurant/restaurant.entity';
import { OpeningHourEntity } from '../../../infrastructure/database/entities/opening-hour/openings-hours.entity';
import { AdminEntity } from '../../../infrastructure/database/entities/admin/admin.entity';
import { ConsumerEntity } from '../../../infrastructure/database/entities/consumer/consumer.entity';
import { TypeOrmUserProfile } from '../../../infrastructure/database/entities/user/repository/typeorm-user-profile.repository';
import { UserController } from '../../../interfaces/controllers/user/user.controller';
import { UserCreateProfileUseCase } from '../../../core/use-cases/user/user-create-profile.use-case';
import { RoleGuard } from '../../../common/guards/roles.guard';
import { GetAllUsersUseCase } from '../../../core/use-cases/user/get-all-users.use-case';
import { DeleteUserUseCase } from '../../../core/use-cases/user/delete-user.use-case';
import { UpdateUserProfileUseCase } from '../../../core/use-cases/user/update-user-profile.use-case';

const useCases = [UserCreateProfileUseCase, GetAllUsersUseCase, DeleteUserUseCase, UpdateUserProfileUseCase];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RestaurantEntity, OpeningHourEntity, AdminEntity, ConsumerEntity]),
    UserCommonModule,
    JwtProviderModule
  ],
  providers: [
    JwtStrategy,
    TypeOrmUserProfile,
    RoleGuard,
    ...useCases.map((useCase) => ({
      provide: useCase,
      useFactory: (userRepo: TypeOrmUserProfile) => new useCase(userRepo),
      inject: [TypeOrmUserProfile]
    }))
  ],
  controllers: [UserController]
})
export class UserModule {}
