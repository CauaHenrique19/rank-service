import { CreateActionUseCase } from '@rank-service/domain/usecases';
import {
  createdSuccess,
  serverError,
} from '@rank-service/presentation/helpers/http-helper';
import { Controller, HttpResponse } from '@rank-service/presentation/protocols';

export class CreateActionController implements Controller {
  constructor(private readonly createAction: CreateActionUseCase) {}

  async handle(
    request: CreateActionController.Parameters,
  ): Promise<HttpResponse> {
    try {
      const createdAction = await this.createAction.create(request);
      return createdSuccess(createdAction);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateActionController {
  export type Parameters = CreateActionUseCase.Parameters;
}
