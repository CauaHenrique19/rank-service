import { FindActionsUseCase } from '@rank-service/domain/usecases';
import {
  ok,
  serverError,
} from '@rank-service/presentation/helpers/http-helper';
import { Controller, HttpResponse } from '@rank-service/presentation/protocols';

export class FindActionsController implements Controller {
  constructor(private readonly findActions: FindActionsUseCase) {}

  async handle(
    request: FindActionsController.Parameters,
  ): Promise<HttpResponse> {
    try {
      const ranks = await this.findActions.find(request);
      return ok(ranks);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace FindActionsController {
  export type Parameters = FindActionsUseCase.Parameters;
}
