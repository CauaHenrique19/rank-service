import { Provider } from '@nestjs/common';

import { Rank } from '@rank-service/infra/orm/entities';
import { RANK_REPOSITORY } from '@rank-service/infra/orm/typeorm/typeorm.repositories';

export const rankProvider: Provider = {
  provide: RANK_REPOSITORY,
  useValue: Rank,
};
