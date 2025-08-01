import { RankModel } from '@rank-service/domain/entities';

export interface FindRanksRepository {
  find(
    parameters?: FindRanksRepository.Parameters,
  ): Promise<FindRanksRepository.Result>;
}

export namespace FindRanksRepository {
  export type Parameters = {
    name?: string;
  };
  export type Result = RankModel[];
}
