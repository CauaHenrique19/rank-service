import { RankModel } from '@rank-service/domain/entities';

export interface CreateRankUseCase {
  create(
    parameters: CreateRankUseCase.Parameters,
  ): Promise<CreateRankUseCase.Result>;
}

export namespace CreateRankUseCase {
  export type Parameters = Omit<RankModel, 'id' | 'status' | 'createdAt'>;
  export type Result = RankModel;
}
