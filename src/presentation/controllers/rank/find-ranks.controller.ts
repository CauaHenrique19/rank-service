import { FindRanksUseCase } from '@rank-service/domain/usecases';
import {
  ok,
  serverError,
} from '@rank-service/presentation/helpers/http-helper';
import { Controller, HttpResponse } from '@rank-service/presentation/protocols';

export class FindRanksController implements Controller {
  constructor(private readonly findRanks: FindRanksUseCase) {}

  async handle(request: FindRanksController.Parameters): Promise<HttpResponse> {
    try {
      const ranks = await this.findRanks.find(request);
      return ok(ranks);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace FindRanksController {
  export type Parameters = FindRanksUseCase.Parameters;
}
