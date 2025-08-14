import { ActionModel } from '@rank-service/domain/entities';
import { ActionKind } from '@rank-service/domain/enums';

export interface FindActionsRepository {
  find(
    parameters?: FindActionsRepository.Parameters,
  ): Promise<FindActionsRepository.Result>;
}

export namespace FindActionsRepository {
  export type Parameters = {
    name?: string;
    kinds?: ActionKind[];
  };
  export type Result = ActionModel[];
}
