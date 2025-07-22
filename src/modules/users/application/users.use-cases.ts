import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class UsersUseCases {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(this.toResponseDto);
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.toResponseDto(user) : null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Validate business rules using domain entity
    const userData = User.create(createUserDto);

    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create user
    const newUser = await this.userRepository.create(userData);
    return this.toResponseDto(newUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto | null> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return null;
    }

    // Update user
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser ? this.toResponseDto(updatedUser) : null;
  }

  async deleteUser(id: number): Promise<void> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }

  private toResponseDto(user: any): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
