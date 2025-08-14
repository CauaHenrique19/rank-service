import { Inject } from '@nestjs/common';
import { EntityTarget, Repository } from 'typeorm';

import { CreateUserActionRepository } from '@rank-service/data/protocols/db';
import { UserAction } from '@rank-service/infra/orm/entities';
import { USER_ACTION_REPOSITORY } from '@rank-service/infra/orm/typeorm/typeorm.repositories';
import { AppDataSource } from '@rank-service/infra/orm/typeorm/data-source';

export class UserActionRepository implements CreateUserActionRepository {
  private readonly userActionRepository: Repository<UserAction>;

  constructor(
    @Inject(USER_ACTION_REPOSITORY)
    private readonly UserAction: EntityTarget<UserAction>,
  ) {
    this.userActionRepository = AppDataSource.getRepository(this.UserAction);
  }

  async create(
    parameters: CreateUserActionRepository.Parameters,
  ): Promise<CreateUserActionRepository.Result> {
    const userActions: UserAction[] = [];

    if (Array.isArray(parameters)) {
      const entities = parameters.map((param) => {
        const userAction = new UserAction();
        Object.assign(userAction, param);

        return userAction;
      });

      userActions.push(...entities);
    } else {
      const userAction = new UserAction();
      Object.assign(userAction, parameters);

      userActions.push(userAction);
    }

    await this.userActionRepository.insert(userActions);
  }
}
