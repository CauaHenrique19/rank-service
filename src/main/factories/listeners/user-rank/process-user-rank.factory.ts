import { Inject, Injectable } from '@nestjs/common';

import { Listener } from '@rank-service/presentation/protocols';
import { ProcessUserRankUseCase } from '@rank-service/domain/usecases';
import { PROCESS_USER_RANK_FACTORY } from '@rank-service/main/factories/providers';
import { ProcessUserRankListener } from '@rank-service/presentation/listeners';

@Injectable()
export class BuildProcessUserRankListener {
  constructor(
    @Inject(PROCESS_USER_RANK_FACTORY)
    private readonly processUserRank: ProcessUserRankUseCase,
  ) {}

  public build(): Listener {
    const listener = new ProcessUserRankListener(this.processUserRank);
    return listener;
  }
}
