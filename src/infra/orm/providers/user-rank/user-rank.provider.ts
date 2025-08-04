import { Provider } from '@nestjs/common';

import { UserRank } from '@rank-service/infra/orm/entities';
import { USER_RANK_REPOSITORY } from '@rank-service/infra/orm/typeorm/typeorm.repositories';

export const userRankProvider: Provider = {
  provide: USER_RANK_REPOSITORY,
  useValue: UserRank,
};
