import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from '../../../infrastructure/database/entities/card/card.entity';
import { RestaurantEntity } from '../../../infrastructure/database/entities/restaurant/restaurant.entity';
import { CreateCardUseCase } from '../../../core/use-cases/card/create-card.use-case';
import { TypeOrmCardRepository } from '../../../infrastructure/database/entities/card/repository/typeorm-card.repository';
import { CardController } from '../../../interfaces/controllers/card/restaurant.controller';

const useCases = [CreateCardUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, RestaurantEntity])],
  providers: [
    TypeOrmCardRepository,
    ...useCases.map((useCase) => ({
      provide: useCase,
      useFactory: (cardRepo: TypeOrmCardRepository) => new useCase(cardRepo),
      inject: [TypeOrmCardRepository]
    }))
  ],
  controllers: [CardController]
})
export class CardModule {}
