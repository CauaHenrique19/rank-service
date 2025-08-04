import { UserRankModel } from '@rank-service/domain/entities';

export interface CreateUserRankRepository {
  create(
    parameters: CreateUserRankRepository.Parameters,
  ): Promise<CreateUserRankRepository.Result>;
}

export namespace CreateUserRankRepository {
  export type Parameters = Omit<UserRankModel, 'id'>;
  export type Result = UserRankModel;
}
