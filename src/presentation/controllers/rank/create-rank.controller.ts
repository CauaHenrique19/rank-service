import { CreateRankUseCase } from '@rank-service/domain/usecases';
import {
  createdSuccess,
  serverError,
} from '@rank-service/presentation/helpers/http-helper';
import { Controller, HttpResponse } from '@rank-service/presentation/protocols';

export class CreateRankController implements Controller {
  constructor(private readonly createRank: CreateRankUseCase) {}

  async handle(
    request: CreateRankController.Parameters,
  ): Promise<HttpResponse> {
    try {
      const createdRank = await this.createRank.create(request);
      return createdSuccess(createdRank);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateRankController {
  export type Parameters = CreateRankUseCase.Parameters;
}
