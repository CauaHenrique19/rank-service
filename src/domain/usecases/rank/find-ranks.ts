import { RankModel } from '@rank-service/domain/entities';

export interface FindRanksUseCase {
  find(
    parameters: FindRanksUseCase.Parameters,
  ): Promise<FindRanksUseCase.Result>;
}

export namespace FindRanksUseCase {
  export type Parameters = {
    name?: string;
  };
  export type Result = RankModel[];
}
