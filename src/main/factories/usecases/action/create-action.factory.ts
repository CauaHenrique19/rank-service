import { Provider } from '@nestjs/common';

import { CREATE_ACTION_FACTORY } from '@rank-service/main/factories/providers';
import { CreateActionUseCase } from '@rank-service/domain/usecases';
import { CreateAction } from '@rank-service/data/usecases';
import { ActionRepository } from '@rank-service/infra/orm/repositories';

export const createActionFactory: Provider = {
  provide: CREATE_ACTION_FACTORY,
  useFactory: (actionRepository: ActionRepository): CreateActionUseCase => {
    return new CreateAction(actionRepository);
  },
  inject: [ActionRepository],
};
