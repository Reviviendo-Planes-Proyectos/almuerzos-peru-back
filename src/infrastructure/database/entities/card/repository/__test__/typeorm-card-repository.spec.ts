import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCardRepository } from '../typeorm-card.repository';
import { CardEntity } from '../../card.entity';
import { RestaurantEntity } from '../../../restaurant/restaurant.entity';
import { CreatedCardDTO } from '../../../../../../core/domain/dto/card/created-card.dto';

describe('TypeOrmCardRepository', () => {
  let repository: TypeOrmCardRepository;
  let cardRepo: jest.Mocked<Repository<CardEntity>>;
  let restaurantRepo: jest.Mocked<Repository<RestaurantEntity>>;

  const mockRestaurant = {
    id: 1,
    name: 'Test Restaurant'
  } as RestaurantEntity;

  const mockCardData = {
    name: 'Test Card',
    description: 'Test Description',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
  };

  const mockSavedCard = {
    id: 1,
    ...mockCardData,
    isActive: true,
    restaurant: mockRestaurant
  } as CreatedCardDTO;

  beforeEach(async () => {
    const mockCardRepository = {
      create: jest.fn(),
      save: jest.fn()
    };

    const mockRestaurantRepository = {
      findOne: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmCardRepository,
        {
          provide: getRepositoryToken(CardEntity),
          useValue: mockCardRepository
        },
        {
          provide: getRepositoryToken(RestaurantEntity),
          useValue: mockRestaurantRepository
        }
      ]
    }).compile();

    repository = module.get<TypeOrmCardRepository>(TypeOrmCardRepository);
    cardRepo = module.get(getRepositoryToken(CardEntity));
    restaurantRepo = module.get(getRepositoryToken(RestaurantEntity));
  });

  describe('createCard', () => {
    it('should create card successfully when restaurant exists', async () => {
      restaurantRepo.findOne.mockResolvedValue(mockRestaurant);
      cardRepo.create.mockReturnValue(mockSavedCard as any);
      cardRepo.save.mockResolvedValue(mockSavedCard as any);

      const result = await repository.createCard(mockCardData, 1);

      expect(restaurantRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(cardRepo.create).toHaveBeenCalledWith({
        ...mockCardData,
        restaurant: mockRestaurant
      });
      expect(cardRepo.save).toHaveBeenCalled();
      expect(result).toEqual(mockSavedCard);
    });

    it('should return null when restaurant does not exist', async () => {
      restaurantRepo.findOne.mockResolvedValue(null);

      const result = await repository.createCard(mockCardData, 999);

      expect(restaurantRepo.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(cardRepo.create).not.toHaveBeenCalled();
      expect(cardRepo.save).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});
