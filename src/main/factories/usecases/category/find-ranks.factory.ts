import { Provider } from '@nestjs/common';

import { FIND_RANKS_FACTORY } from '@rank-service/main/factories/providers';
import { RankRepository } from '@rank-service/infra/orm/repositories';
import { FindRanksUseCase } from '@rank-service/domain/usecases';
import { FindRanks } from '@rank-service/data/usecases';

export const findRanksFactory: Provider = {
  provide: FIND_RANKS_FACTORY,
  useFactory: (rankRepository: RankRepository): FindRanksUseCase => {
    return new FindRanks(rankRepository);
  },
  inject: [RankRepository],
};
