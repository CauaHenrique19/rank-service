import { Inject, Injectable } from '@nestjs/common';
import { FIND_ACTIONS_FACTORY } from '@rank-service/main/factories/providers';
import { FindActionsUseCase } from '@rank-service/domain/usecases';
import { Controller } from '@rank-service/presentation/protocols';
import { FindActionsController } from '@rank-service/presentation/controllers';

@Injectable()
export class BuildFindActionsController {
  constructor(
    @Inject(FIND_ACTIONS_FACTORY)
    private readonly findActions: FindActionsUseCase,
  ) {}

  public build(): Controller {
    const controller = new FindActionsController(this.findActions);
    return controller;
  }
}
