import { Repository } from 'typeorm';
import { ICardRepositoryInterface } from '../../../../../core/domain/repositories/card/card.repository.interface';
import { CardEntity } from '../card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreatedCardDTO } from '../../../../../core/domain/dto/card/created-card.dto';
import { RestaurantEntity } from '../../restaurant/restaurant.entity';

@Injectable()
export class TypeOrmCardRepository implements ICardRepositoryInterface {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(RestaurantEntity)
    private readonly retaurantRepository: Repository<RestaurantEntity>
  ) {}

  async createCard(
    data: Omit<CreatedCardDTO, 'id' | 'isActive'>,
    restaurantId: number
  ): Promise<CreatedCardDTO | null> {
    const restaurant = await this.retaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      return null;
    }
    const card = this.cardRepository.create({
      ...data,
      restaurant
    });
    const savedCard = await this.cardRepository.save(card);
    return savedCard;
  }
}
