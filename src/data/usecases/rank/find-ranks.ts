import { FindRanksRepository } from '@rank-service/data/protocols/db';
import { FindRanksUseCase } from '@rank-service/domain/usecases';

export class FindRanks implements FindRanksUseCase {
  constructor(private readonly findRanksRepository: FindRanksRepository) {}

  async find(
    parameters: FindRanksUseCase.Parameters,
  ): Promise<FindRanksUseCase.Result> {
    return await this.findRanksRepository.find(parameters);
  }
}
