import { Provider } from '@nestjs/common';

import { FIND_ACTIONS_FACTORY } from '@rank-service/main/factories/providers';
import { ActionRepository } from '@rank-service/infra/orm/repositories';
import { FindActionsUseCase } from '@rank-service/domain/usecases';
import { FindActions } from '@rank-service/data/usecases';

export const findActionsFactory: Provider = {
  provide: FIND_ACTIONS_FACTORY,
  useFactory: (actionRepository: ActionRepository): FindActionsUseCase => {
    return new FindActions(actionRepository);
  },
  inject: [ActionRepository],
};
