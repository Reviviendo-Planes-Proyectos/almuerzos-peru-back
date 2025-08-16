import { CreateCardDTO } from '../../../interfaces/dto/card/request/create-card.dto';
import { CardCreatedDTO } from '../../../interfaces/dto/card/response/card-created.dto';
import { ICardRepositoryInterface } from '../../domain/repositories/card/card.repository.interface';

export class CreateCardUseCase {
  constructor(private readonly cardRepostiroy: ICardRepositoryInterface) {}

  async excute(data: CreateCardDTO, restaurantId: number): Promise<CardCreatedDTO> {
    const card = await this.cardRepostiroy.createCard(data, restaurantId);
    if (!card) {
      throw new Error('Restaurant not found');
    }
    return card;
  }
}
