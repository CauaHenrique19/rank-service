import { Provider } from '@nestjs/common';

import { PROCESS_USER_ACTION_FACTORY } from '@rank-service/main/factories/providers';
import {
  ActionRepository,
  UserActionRepository,
} from '@rank-service/infra/orm/repositories';
import { ProcessUserActionUseCase } from '@rank-service/domain/usecases';
import { ProcessUserAction } from '@rank-service/data/usecases';
import { KafkaMessageBrokerAdapter } from '@rank-service/infra/kafka/adapter';

export const processUserActionFactory: Provider = {
  provide: PROCESS_USER_ACTION_FACTORY,
  useFactory: (
    actionRepository: ActionRepository,
    userActionRepository: UserActionRepository,
    kafkaMessageBrokerAdapter: KafkaMessageBrokerAdapter,
  ): ProcessUserActionUseCase => {
    return new ProcessUserAction(
      actionRepository,
      userActionRepository,
      kafkaMessageBrokerAdapter,
    );
  },
  inject: [ActionRepository, UserActionRepository, KafkaMessageBrokerAdapter],
};
