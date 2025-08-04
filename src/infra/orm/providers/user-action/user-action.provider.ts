import { Provider } from '@nestjs/common';

import { UserAction } from '@rank-service/infra/orm/entities';
import { USER_ACTION_REPOSITORY } from '@rank-service/infra/orm/typeorm/typeorm.repositories';

export const userActionProvider: Provider = {
  provide: USER_ACTION_REPOSITORY,
  useValue: UserAction,
};
