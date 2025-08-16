import { CreatedCardDTO } from '../../dto/card/created-card.dto';

export interface ICardRepositoryInterface {
  createCard(data: Omit<CreatedCardDTO, 'id' | 'isActive'>, restaurantId: number): Promise<CreatedCardDTO | null>;
}
