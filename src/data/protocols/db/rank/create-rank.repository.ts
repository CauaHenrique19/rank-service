import { RankModel } from '@rank-service/domain/entities';

export interface CreateRankRepository {
  create(
    parameters: CreateRankRepository.Parameters,
  ): Promise<CreateRankRepository.Result>;
}

export namespace CreateRankRepository {
  export type Parameters = Omit<RankModel, 'id'>;
  export type Result = RankModel;
}
