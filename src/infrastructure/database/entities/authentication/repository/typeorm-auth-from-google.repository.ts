import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { IGoogleAuthRepository } from '../../../../../core/domain/repositories/authentication/google-auth.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from '../../../../../common/firebase/firebase.service';
import { IUser } from '../../../../../core/domain/repositories/authentication/user.entity';

@Injectable()
export class TypeOrmAuthenticationFromGoogle implements IGoogleAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly firebaseService: FirebaseService,
    private readonly jwtService: JwtService
  ) {}

  async decodedUserFromGoogle(token: string): Promise<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>> {
    const decodedToken = await this.firebaseService.verifyToken(token);
    return {
      username: decodedToken.name,
      email: decodedToken.email,
      sub: decodedToken.sub,
      emailVerified: decodedToken.email_verified,
      providerId: decodedToken.firebase.sign_in_provider,
      imageUrl: decodedToken.picture
    };
  }

  async saveUser(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  findUserBySub(sub: string): Promise<IUser | null> {
    const user = this.userRepository.findOneBy({
      sub: sub
    });
    return user;
  }

  generateJWT({ sub, email, username }: IUser): string {
    return this.jwtService.sign({ sub, email, username });
  }
}
