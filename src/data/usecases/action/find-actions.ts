import { FindActionsRepository } from '@rank-service/data/protocols/db';
import { FindActionsUseCase } from '@rank-service/domain/usecases';

export class FindActions implements FindActionsUseCase {
  constructor(private readonly findActionsRepository: FindActionsRepository) {}

  async find(
    parameters: FindActionsUseCase.Parameters,
  ): Promise<FindActionsUseCase.Result> {
    return await this.findActionsRepository.find(parameters);
  }
}
