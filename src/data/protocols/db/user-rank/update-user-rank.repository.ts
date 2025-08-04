import { UserRankModel } from '@rank-service/domain/entities';

export interface UpdateUserRankRepository {
  update(
    parameters: UpdateUserRankRepository.Parameters,
  ): Promise<UpdateUserRankRepository.Result>;
}

export namespace UpdateUserRankRepository {
  export type Parameters = Pick<UserRankModel, 'id'> &
    Partial<Pick<UserRankModel, 'pontuation' | 'rankId'>>;
  export type Result = void;
}
