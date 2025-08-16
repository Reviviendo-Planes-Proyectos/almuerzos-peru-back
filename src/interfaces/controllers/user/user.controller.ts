import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UserExistGuad } from '../../../common/guards/user-exists.guard';
import { UserCreateProfileUseCase } from '../../../core/use-cases/user/user-create-profile.use-case';
import { RegisterUserProfileDto } from '../../dto/user/request/create-user-profile.dto';
import { UserRegisterProfileDTO } from '../../dto/user/response/user-profile.dto';
import { GetAllUsersUseCase } from '../../../core/use-cases/user/get-all-users.use-case';
import { PaginationResponseUsers } from '../../dto/user/response/pagination-users.dto';
import { PaginationQueryParamDTO } from '../../dto/pagination/request/pagination-query-param.dto';
import { SearchUserDto } from '../../dto/search/search-filters.dto';
import { DeleteUserUseCase } from '../../../core/use-cases/user/delete-user.use-case';
import { UpdateUserProfileUseCase } from '../../../core/use-cases/user/update-user-profile.use-case';
import { UpdateUserProfileDTO } from '../../dto/user/request/update-user-profile.dto';
import { UserUpdateProfileDTO } from '../../dto/user/response/user-update-profile.dto';

@UseGuards(JwtAuthGuard, UserExistGuad)
@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(
    private readonly userCreateProfileUseCase: UserCreateProfileUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserProfileUseCase
  ) {}

  @Post('profile')
  @ApiOperation({ summary: 'Registrar el perfil del usuario' })
  @ApiBody({ type: RegisterUserProfileDto })
  @ApiCreatedResponse({
    description: 'Perfil del usuario registrado',
    type: UserRegisterProfileDTO
  })
  async createProfileUser(@Req() req: Request, @Body() profile: RegisterUserProfileDto) {
    try {
      const user = req.user as { sub: string };
      const profileRegister = await this.userCreateProfileUseCase.execute(user.sub, profile);
      return plainToInstance(UserRegisterProfileDTO, profileRegister);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('')
  @ApiOperation({ summary: 'Listado y filtrado de usuarios' })
  @ApiBody({ type: SearchUserDto })
  @ApiQuery({ type: PaginationQueryParamDTO })
  @ApiCreatedResponse({
    description: 'Listado de usuarios',
    type: PaginationResponseUsers
  })
  async getAllUsers(@Query() params: PaginationQueryParamDTO, @Body() filters: SearchUserDto) {
    try {
      const users = await this.getAllUsersUseCase.execute(params, filters);
      const data = plainToInstance(PaginationResponseUsers, users);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id del usuario',
    example: 1
  })
  @ApiCreatedResponse({
    example: {
      message: 'Usuario eliminado'
    }
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deleteUserUseCase.excute(id);
      return {
        message: 'Usuario eliminado'
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @Put('')
  @ApiOperation({ summary: 'Actualizar el perfil del usuario' })
  @ApiBody({ type: UpdateUserProfileDTO })
  @ApiCreatedResponse({
    description: 'Perfil del usuario actualizado',
    type: UserUpdateProfileDTO
  })
  async updateUser(@Req() req: Request, @Body() userData: UpdateUserProfileDTO) {
    try {
      const user = req.user as { sub: string };
      const updateUser = await this.updateUserUseCase.execute(user.sub, userData);
      return plainToInstance(UserUpdateProfileDTO, updateUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
