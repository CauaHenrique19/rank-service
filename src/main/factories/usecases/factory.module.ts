import { Module } from '@nestjs/common';

import { RankRepository } from '@rank-service/infra/orm/repositories';
import { rankProvider } from '@rank-service/infra/orm/providers';
import {
  createRankFactory,
  findRanksFactory,
} from '@rank-service/main/factories/usecases';

@Module({
  providers: [
    //repositories
    RankRepository,

    //providers
    rankProvider,

    //usecases
    createRankFactory,
    findRanksFactory,
  ],
  exports: [createRankFactory, findRanksFactory],
})
export class FactoryModule {}
