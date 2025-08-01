import { Inject, Injectable } from '@nestjs/common';

import { Controller } from '@rank-service/presentation/protocols';
import { CreateRankUseCase } from '@rank-service/domain/usecases';
import { CREATE_RANK_FACTORY } from '@rank-service/main/factories/providers';
import { CreateRankController } from '@rank-service/presentation/controllers';

@Injectable()
export class BuildCreateRankController {
  constructor(
    @Inject(CREATE_RANK_FACTORY)
    private readonly createRank: CreateRankUseCase,
  ) {}

  public build(): Controller {
    const controller = new CreateRankController(this.createRank);
    return controller;
  }
}
