import { CreateRankRepository } from '@rank-service/data/protocols/db';
import { CreateRankUseCase } from '@rank-service/domain/usecases';

export class CreateRank implements CreateRankUseCase {
  constructor(private readonly createRankRepository: CreateRankRepository) {}

  async create(
    parameters: CreateRankUseCase.Parameters,
  ): Promise<CreateRankUseCase.Result> {
    const now = new Date();

    const createdCategory = await this.createRankRepository.create({
      ...parameters,
      createdAt: now,
    });

    return createdCategory;
  }
}
