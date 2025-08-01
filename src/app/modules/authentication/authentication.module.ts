import { Module } from '@nestjs/common';
import { UserEntity } from '../../../infrastructure/database/entities/authentication/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtProviderModule } from 'src/common/jwt/jwt.module';
import { FirebaseService } from 'src/common/firebase/firebase.service';
import { AuthenticationContrller } from 'src/interfaces/controllers/authentication/authentication.controller';
import { GetAllUsersUseCase } from 'src/core/use-cases/authentication/get-all-users.use-case';
import { TypeOrmAuthenticationFromFirebase } from 'src/infrastructure/database/entities/authentication/repository/typeorm-auth-from-firebase.repository';
import { CreateUserFromFirebaseAuthUseCase } from 'src/core/use-cases/authentication/create-user-from-firebase-auth.use-case';

const useCases = [CreateUserFromFirebaseAuthUseCase, GetAllUsersUseCase];
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtProviderModule],
  providers: [
    FirebaseService,
    TypeOrmAuthenticationFromFirebase,
    ...useCases.map((useCase) => ({
      provide: useCase,
      useFactory: (authRepo: TypeOrmAuthenticationFromFirebase) => new useCase(authRepo),
      inject: [TypeOrmAuthenticationFromFirebase]
    }))
  ],
  controllers: [AuthenticationContrller]
})
export class AuthenticationModule {}
