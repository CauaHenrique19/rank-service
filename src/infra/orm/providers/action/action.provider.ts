import { Provider } from '@nestjs/common';

import { Action } from '@rank-service/infra/orm/entities';
import { ACTION_REPOSITORY } from '@rank-service/infra/orm/typeorm/typeorm.repositories';

export const actionProvider: Provider = {
  provide: ACTION_REPOSITORY,
  useValue: Action,
};
