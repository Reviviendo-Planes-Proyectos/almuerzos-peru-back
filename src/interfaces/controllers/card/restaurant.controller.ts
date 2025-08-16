import { Body, Controller, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCardUseCase } from '../../../core/use-cases/card/create-card.use-case';
import { CreateCardDTO } from '../../dto/card/request/create-card.dto';
import { plainToInstance } from 'class-transformer';
import { CardCreatedDTO } from '../../dto/card/response/card-created.dto';

@ApiTags('restaurants')
@Controller({ path: 'restaurants', version: '1' })
export class CardController {
  constructor(private readonly createCardUseCase: CreateCardUseCase) {}

  @Post(':restaurantId/cards')
  @ApiParam({
    name: 'restaurantId',
    type: Number,
    description: 'Id del restaurante',
    example: 1
  })
  @ApiOperation({ summary: 'Creacion de cartas relacionadas al restaurante' })
  @ApiBody({ type: CreateCardDTO })
  @ApiCreatedResponse({
    description: 'Carta creada',
    type: CardCreatedDTO
  })
  async createCard(@Param('restaurantId', ParseIntPipe) restaurantId: number, @Body() data: CreateCardDTO) {
    try {
      const card = await this.createCardUseCase.excute(data, restaurantId);
      return plainToInstance(CardCreatedDTO, card);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
