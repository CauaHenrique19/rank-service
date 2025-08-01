import { CreateActionRepository } from '@rank-service/data/protocols/db';
import { CreateActionUseCase } from '@rank-service/domain/usecases';

export class CreateAction implements CreateActionUseCase {
  constructor(
    private readonly createActionRepository: CreateActionRepository,
  ) {}

  async create(
    parameters: CreateActionUseCase.Parameters,
  ): Promise<CreateActionUseCase.Result> {
    const now = new Date();

    const createdAction = await this.createActionRepository.create({
      ...parameters,
      createdAt: now,
    });

    return createdAction;
  }
}
