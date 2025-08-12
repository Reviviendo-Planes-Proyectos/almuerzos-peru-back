import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserProfileRepository } from 'src/core/domain/repositories/user/user.repository.interface';
import { UserEntity } from '../../authentication/user.entity';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../../restaurant/restaurant.entity';
import { OpeningHourEntity } from '../../opening-hour/openings-hours.entity';
import { AdminEntity } from '../../admin/admin.entity';
import { ConsumerEntity } from '../../consumer/consumer.entity';
import { UserProfileDTO } from '../../../../../core/domain/dto/user/user-profile.dto';
import { PaginationResult } from '../../../../../core/domain/dto/pagination/pagination.result.dto';
import { PaginationQueryParamDTO } from '../../../../../core/domain/dto/pagination/pagintion-query-param.dto';
import { SearchParams } from '../../../../../core/domain/dto/search/search-param';
import { paginateWithFilters } from '../../../../../common/utils/pagination/pagination-with-filters';
import { UserDTO } from '../../../../../core/domain/dto/user/user.dto';

@Injectable()
export class TypeOrmUserProfile implements IUserProfileRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async registerInfoUser(sub: string, userData: UserProfileDTO): Promise<UserProfileDTO> {
    return this.userRepository.manager.transaction(async (manager) => {
      const user = await manager.findOne(UserEntity, {
        where: { sub }
      });
      const { dni, firstName, lastName, phone, district, province, role, description } = userData;
      Object.assign(user, {
        sub,
        dni,
        firstName,
        lastName,
        phone,
        district,
        province,
        role,
        description
      });
      let relations: string[] = [];
      if (userData.role === 'restaurant' && userData.restaurant) {
        const savedRestaurant = await manager.save(RestaurantEntity, userData.restaurant);
        if (userData.restaurant.openingHour?.length) {
          const hours = userData.restaurant.openingHour.map((hour) =>
            manager.create(OpeningHourEntity, {
              ...hour,
              restaurant: savedRestaurant
            })
          );
          savedRestaurant.openingHour = await manager.save(OpeningHourEntity, hours);
          user.restaurant = savedRestaurant;
          relations = ['restaurant', 'restaurant.openingHour'];
        }
      }
      if (userData.role === 'admin') {
        await manager.save(AdminEntity, { user });
        relations = ['admin'];
      }
      if (userData.role === 'consumer') {
        await manager.save(ConsumerEntity, { user, userName: user.username });
        relations = ['consumer'];
      }
      await manager.save(UserEntity, user);
      const userUpdated = await manager.findOne(UserEntity, {
        where: { sub },
        relations: relations
      });
      return userUpdated;
    });
  }

  async getAllUsers(params: PaginationQueryParamDTO, filters: SearchParams): Promise<PaginationResult<UserDTO>> {
    console.log(filters);
    const users = await paginateWithFilters(this.userRepository, { ...params, ...filters });
    return users;
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) return false;

    user.isDeleted = true;
    await this.userRepository.save(user);

    await this.userRepository.softDelete(id);
    return true;
  }
}
