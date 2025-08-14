import { Provider } from '@nestjs/common';

import { PROCESS_USER_RANK_FACTORY } from '@rank-service/main/factories/providers';
import {
  RankRepository,
  UserRankRepository,
} from '@rank-service/infra/orm/repositories';
import { ProcessUserRankUseCase } from '@rank-service/domain/usecases';
import { ProcessUserRank } from '@rank-service/data/usecases';
import { KafkaMessageBrokerAdapter } from '@rank-service/infra/kafka/adapter';

export const processUserRankFactory: Provider = {
  provide: PROCESS_USER_RANK_FACTORY,
  useFactory: (
    userRankRepository: UserRankRepository,
    rankRepository: RankRepository,
    kafkaMessageBrokerAdapter: KafkaMessageBrokerAdapter,
  ): ProcessUserRankUseCase => {
    return new ProcessUserRank(
      userRankRepository,
      rankRepository,
      userRankRepository,
      userRankRepository,
      kafkaMessageBrokerAdapter,
    );
  },
  inject: [UserRankRepository, RankRepository, KafkaMessageBrokerAdapter],
};
