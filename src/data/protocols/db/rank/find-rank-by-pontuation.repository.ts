import { RankModel } from '@rank-service/domain/entities';

export interface FindRankByPontuationRepository {
  findByPontuation(
    parameters: FindRankByPontuationRepository.Parameters,
  ): Promise<FindRankByPontuationRepository.Result>;
}

export namespace FindRankByPontuationRepository {
  export type Parameters = {
    pontuation: number;
  };
  export type Result = RankModel | null;
}
