import { CreateCardUseCase } from '../create-card.use-case';
import { CreateCardDTO } from '../../../../interfaces/dto/card/request/create-card.dto';
import { ICardRepositoryInterface } from '../../../domain/repositories/card/card.repository.interface';
import { CardCreatedDTO } from '../../../../interfaces/dto/card/response/card-created.dto';

describe('CreateCardUseCase', () => {
  let useCase: CreateCardUseCase;
  let mockRepository: jest.Mocked<ICardRepositoryInterface>;

  beforeEach(() => {
    mockRepository = {
      createCard: jest.fn()
    } as any;

    useCase = new CreateCardUseCase(mockRepository);
  });

  const createDto: CreateCardDTO = {
    name: 'Test Card',
    description: 'Test Description'
  };

  const expectedResponse: CardCreatedDTO = {
    id: 1,
    name: 'Test Card',
    description: 'Test Description',
    isActive: true
  };

  describe('execute', () => {
    test('should create card successfully', async () => {
      mockRepository.createCard.mockResolvedValue(expectedResponse);

      const result = await useCase.excute(createDto, 1);

      expect(mockRepository.createCard).toHaveBeenCalledWith(createDto, 1);
      expect(result).toEqual(expectedResponse);
    });

    test('should throw error when restaurant not found', async () => {
      mockRepository.createCard.mockResolvedValue(null);

      await expect(useCase.excute(createDto, 999)).rejects.toThrow('Restaurant not found');

      expect(mockRepository.createCard).toHaveBeenCalledWith(createDto, 999);
    });
  });
});
