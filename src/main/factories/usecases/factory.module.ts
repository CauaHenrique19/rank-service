import { Module } from '@nestjs/common';

import {
  ActionRepository,
  RankRepository,
} from '@rank-service/infra/orm/repositories';
import {
  actionProvider,
  rankProvider,
} from '@rank-service/infra/orm/providers';
import {
  createActionFactory,
  createRankFactory,
  findActionsFactory,
  findRanksFactory,
} from '@rank-service/main/factories/usecases';

@Module({
  providers: [
    //repositories
    RankRepository,
    ActionRepository,

    //providers
    rankProvider,
    actionProvider,

    //usecases
    createRankFactory,
    findRanksFactory,
    createActionFactory,
    findActionsFactory,
  ],
  exports: [
    createRankFactory,
    findRanksFactory,
    createActionFactory,
    findActionsFactory,
  ],
})
export class FactoryModule {}
