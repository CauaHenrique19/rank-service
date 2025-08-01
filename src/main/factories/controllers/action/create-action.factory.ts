import { Inject, Injectable } from '@nestjs/common';

import { Controller } from '@rank-service/presentation/protocols';
import { CreateActionUseCase } from '@rank-service/domain/usecases';
import { CREATE_ACTION_FACTORY } from '@rank-service/main/factories/providers';
import { CreateActionController } from '@rank-service/presentation/controllers';

@Injectable()
export class BuildCreateActionController {
  constructor(
    @Inject(CREATE_ACTION_FACTORY)
    private readonly createAction: CreateActionUseCase,
  ) {}

  public build(): Controller {
    const controller = new CreateActionController(this.createAction);
    return controller;
  }
}
