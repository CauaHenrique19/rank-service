import { UserActionModel } from '@rank-service/domain/entities';

export interface CreateUserActionRepository {
  create(
    parameters: CreateUserActionRepository.Parameters,
  ): Promise<CreateUserActionRepository.Result>;
}

export namespace CreateUserActionRepository {
  export type Parameters = Omit<UserActionModel, 'id'>;
  export type Result = UserActionModel;
}
