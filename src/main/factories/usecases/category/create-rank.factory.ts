import { Provider } from '@nestjs/common';

import { CREATE_RANK_FACTORY } from '@rank-service/main/factories/providers';
import { CreateRankUseCase } from '@rank-service/domain/usecases';
import { CreateRank } from '@rank-service/data/usecases';
import { RankRepository } from '@rank-service/infra/orm/repositories';

export const createRankFactory: Provider = {
  provide: CREATE_RANK_FACTORY,
  useFactory: (rankRepository: RankRepository): CreateRankUseCase => {
    return new CreateRank(rankRepository);
  },
  inject: [RankRepository],
};
