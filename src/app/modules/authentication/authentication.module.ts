import { Module } from '@nestjs/common';
import { UserEntity } from '../../../infrastructure/database/entities/authentication/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmAuthenticationFromGoogle } from '../../../infrastructure/database/entities/authentication/repository/typeorm-auth-from-google.repository';
import CreateUserFromGoogleUseCase from '../../../core/use-cases/authentication/create-user-from-google.use-case';
import { JwtProviderModule } from 'src/common/jwt/jwt.module';
import { FirebaseService } from 'src/common/firebase/firebase.service';
import { AuthenticationContrller } from 'src/interfaces/controllers/authentication/authentication.controller';
import { GetAllUsersUseCase } from 'src/core/use-cases/authentication/get-all-users.use-case';
const useCases = [CreateUserFromGoogleUseCase, GetAllUsersUseCase];
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtProviderModule],
  providers: [
    FirebaseService,
    TypeOrmAuthenticationFromGoogle,
    ...useCases.map((useCase) => ({
      provide: useCase,
      useFactory: (authRepo: TypeOrmAuthenticationFromGoogle) => new useCase(authRepo),
      inject: [TypeOrmAuthenticationFromGoogle]
    }))
  ],
  controllers: [AuthenticationContrller]
})
export class AuthenticationModule {}
