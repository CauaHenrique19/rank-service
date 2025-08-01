import { ActionModel } from '@rank-service/domain/entities';

export interface CreateActionRepository {
  create(
    parameters: CreateActionRepository.Parameters,
  ): Promise<CreateActionRepository.Result>;
}

export namespace CreateActionRepository {
  export type Parameters = Omit<ActionModel, 'id'>;
  export type Result = ActionModel;
}
