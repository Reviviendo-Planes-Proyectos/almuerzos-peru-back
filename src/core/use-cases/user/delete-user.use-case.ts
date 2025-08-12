import { IUserProfileRepository } from '../../domain/repositories/user/user.repository.interface';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserProfileRepository) {}
  async excute(id: number): Promise<void> {
    const user = await this.userRepository.deleteUser(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return;
  }
}
