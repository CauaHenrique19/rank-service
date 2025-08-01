import { ActionModel } from '@rank-service/domain/entities';

export interface FindActionsRepository {
  find(
    parameters?: FindActionsRepository.Parameters,
  ): Promise<FindActionsRepository.Result>;
}

export namespace FindActionsRepository {
  export type Parameters = {
    name?: string;
  };
  export type Result = ActionModel[];
}
