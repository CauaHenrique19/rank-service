import { ActionModel } from '@rank-service/domain/entities';

export interface FindActionsUseCase {
  find(
    parameters: FindActionsUseCase.Parameters,
  ): Promise<FindActionsUseCase.Result>;
}

export namespace FindActionsUseCase {
  export type Parameters = {
    name?: string;
  };
  export type Result = ActionModel[];
}
