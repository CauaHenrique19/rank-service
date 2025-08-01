import { Inject, Injectable } from '@nestjs/common';
import { FIND_RANKS_FACTORY } from '@rank-service/main/factories/providers';
import { FindRanksUseCase } from '@rank-service/domain/usecases';
import { Controller } from '@rank-service/presentation/protocols';
import { FindRanksController } from '@rank-service/presentation/controllers';

@Injectable()
export class BuildFindRanksController {
  constructor(
    @Inject(FIND_RANKS_FACTORY) private readonly findRanks: FindRanksUseCase,
  ) {}

  public build(): Controller {
    const controller = new FindRanksController(this.findRanks);
    return controller;
  }
}
