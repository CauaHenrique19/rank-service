import { Inject } from '@nestjs/common';
import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';

import {
  CreateActionRepository,
  FindActionsRepository,
} from '@rank-service/data/protocols/db';
import { Action } from '@rank-service/infra/orm/entities';
import { ACTION_REPOSITORY } from '@rank-service/infra/orm/typeorm/typeorm.repositories';
import { AppDataSource } from '@rank-service/infra/orm/typeorm/data-source';

export class ActionRepository
  implements CreateActionRepository, FindActionsRepository
{
  private readonly actionRepository: Repository<Action>;

  constructor(
    @Inject(ACTION_REPOSITORY)
    private readonly Action: EntityTarget<Action>,
  ) {
    this.actionRepository = AppDataSource.getRepository(this.Action);
  }

  find(
    parameters?: FindActionsRepository.Parameters,
  ): Promise<FindActionsRepository.Result> {
    const where: FindOptionsWhere<Action> = {};

    if (parameters?.name) {
      where.name = parameters.name;
    }

    return this.actionRepository.find({
      where,
    });
  }

  async create(
    parameters: CreateActionRepository.Parameters,
  ): Promise<CreateActionRepository.Result> {
    const rank = new Action();
    Object.assign(rank, parameters);

    await this.actionRepository.save(rank);
    return rank;
  }
}
