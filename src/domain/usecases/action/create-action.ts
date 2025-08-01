import { ActionModel } from '@rank-service/domain/entities';

export interface CreateActionUseCase {
  create(
    parameters: CreateActionUseCase.Parameters,
  ): Promise<CreateActionUseCase.Result>;
}

export namespace CreateActionUseCase {
  export type Parameters = Omit<ActionModel, 'id' | 'createdAt'>;
  export type Result = ActionModel;
}
