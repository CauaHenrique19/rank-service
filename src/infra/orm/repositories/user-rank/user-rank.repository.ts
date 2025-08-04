import { Inject } from '@nestjs/common';
import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';

import {
  CreateUserRankRepository,
  FindUserRankRepository,
  UpdateUserRankRepository,
} from '@rank-service/data/protocols/db';
import { UserRank } from '@rank-service/infra/orm/entities';
import { USER_RANK_REPOSITORY } from '@rank-service/infra/orm/typeorm/typeorm.repositories';
import { AppDataSource } from '@rank-service/infra/orm/typeorm/data-source';

export class UserRankRepository
  implements
    CreateUserRankRepository,
    UpdateUserRankRepository,
    FindUserRankRepository
{
  private readonly userRankRepository: Repository<UserRank>;

  constructor(
    @Inject(USER_RANK_REPOSITORY)
    private readonly UserRank: EntityTarget<UserRank>,
  ) {
    this.userRankRepository = AppDataSource.getRepository(this.UserRank);
  }

  async create(
    parameters: CreateUserRankRepository.Parameters,
  ): Promise<CreateUserRankRepository.Result> {
    const userRank = new UserRank();
    Object.assign(userRank, parameters);

    await this.userRankRepository.save(userRank);
    return userRank;
  }

  async update(
    parameters: UpdateUserRankRepository.Parameters,
  ): Promise<UpdateUserRankRepository.Result> {
    await this.userRankRepository.update(
      {
        id: parameters.id,
      },
      { ...parameters },
    );
  }

  find(
    parameters: FindUserRankRepository.Parameters,
  ): Promise<FindUserRankRepository.Result> {
    const where: FindOptionsWhere<UserRank> = {};

    if (parameters?.userId) {
      where.userId = parameters.userId;
    }

    return this.userRankRepository.findOne({
      where,
    });
  }
}
