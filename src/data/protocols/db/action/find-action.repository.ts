import { ActionModel } from '@rank-service/domain/entities';
import { ActionKind } from '@rank-service/domain/enums';

export interface FindActionRepository {
  findOne(
    parameters?: FindActionRepository.Parameters,
  ): Promise<FindActionRepository.Result>;
}

export namespace FindActionRepository {
  export type Parameters = {
    kind?: ActionKind;
  };
  export type Result = ActionModel | null;
}
