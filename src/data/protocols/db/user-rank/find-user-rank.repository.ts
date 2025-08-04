import { UserRankModel } from '@rank-service/domain/entities';

export interface FindUserRankRepository {
  find(
    parameters: FindUserRankRepository.Parameters,
  ): Promise<FindUserRankRepository.Result>;
}

export namespace FindUserRankRepository {
  export type Parameters = Pick<UserRankModel, 'userId'>;
  export type Result = UserRankModel | null;
}
