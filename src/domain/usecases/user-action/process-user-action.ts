import { UserActionModel } from '@rank-service/domain/entities';
import { ActionKind } from '@rank-service/domain/enums';

export interface ProcessUserActionUseCase {
  process(
    parameters: ProcessUserActionUseCase.Parameters,
  ): Promise<ProcessUserActionUseCase.Result>;
}

export namespace ProcessUserActionUseCase {
  export type Parameters = Omit<
    UserActionModel,
    'id' | 'actionId' | 'createdAt'
  > & {
    kind: ActionKind;
    review?: {
      userId: string;
    };
  };
  export type Result = void;
}
