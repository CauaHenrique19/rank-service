import { Module } from '@nestjs/common';

import {
  ActionRepository,
  RankRepository,
  UserActionRepository,
  UserRankRepository,
} from '@rank-service/infra/orm/repositories';
import {
  actionProvider,
  rankProvider,
  userActionProvider,
  userRankProvider,
} from '@rank-service/infra/orm/providers';
import {
  createActionFactory,
  createRankFactory,
  findActionsFactory,
  findRanksFactory,
  processUserActionFactory,
  processUserRankFactory,
} from '@rank-service/main/factories/usecases';
import { KafkaMessageBrokerAdapter } from '@rank-service/infra/kafka/adapter';

@Module({
  providers: [
    KafkaMessageBrokerAdapter,

    //repositories
    RankRepository,
    ActionRepository,
    UserActionRepository,
    UserRankRepository,

    //providers
    rankProvider,
    actionProvider,
    userActionProvider,
    userRankProvider,

    //usecases
    createRankFactory,
    findRanksFactory,
    createActionFactory,
    findActionsFactory,
    processUserActionFactory,
    processUserRankFactory,
  ],
  exports: [
    KafkaMessageBrokerAdapter,

    createRankFactory,
    findRanksFactory,
    createActionFactory,
    findActionsFactory,
    processUserActionFactory,
    processUserRankFactory,
  ],
})
export class FactoryModule {}
