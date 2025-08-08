import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from '../../../../../common/firebase/firebase.service';
import { IFirebaseAuthRepository } from 'src/core/domain/repositories/authentication/firebase-auth.repository.interface';
import { UserAuthenticationDTO } from 'src/core/domain/dto/authentication/user.authentication.dto';
import { IUser } from 'src/core/domain/repositories/authentication/user.entity';

@Injectable()
export class TypeOrmAuthenticationFromFirebase implements IFirebaseAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly firebaseService: FirebaseService,
    private readonly jwtService: JwtService
  ) {}

  async decodedUserFromFirebase(token: string): Promise<UserAuthenticationDTO> {
    const decodedToken = await this.firebaseService.verifyToken(token);
    return {
      username: decodedToken.name,
      email: decodedToken.email,
      sub: decodedToken.sub,
      emailVerified: decodedToken.email_verified,
      providerId: decodedToken.firebase.sign_in_provider,
      profilePicture: decodedToken.picture
    };
  }

  async saveUser(user: UserAuthenticationDTO): Promise<IUser> {
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  findUserBySub(sub: string): Promise<UserAuthenticationDTO | null> {
    const user = this.userRepository.findOneBy({
      sub: sub
    });
    return user;
  }

  generateJWT({ sub, email, username }: IUser): string {
    return this.jwtService.sign({ sub, email, username });
  }

  getAllUsers(): Promise<UserAuthenticationDTO[]> {
    return this.userRepository.find();
  }
}
