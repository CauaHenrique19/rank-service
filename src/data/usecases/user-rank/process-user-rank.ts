import {
  CreateUserRankRepository,
  FindRankByPontuationRepository,
  FindUserRankRepository,
  UpdateUserRankRepository,
} from '@rank-service/data/protocols/db';
import { MessageBroker } from '@rank-service/data/protocols/message-broker';
import { RankNotFoundError } from '@rank-service/domain/errors';
import { ProcessUserRankUseCase } from '@rank-service/domain/usecases';

export class ProcessUserRank implements ProcessUserRankUseCase {
  constructor(
    private readonly findUserRankRepository: FindUserRankRepository,
    private readonly findRankByPontuationRepository: FindRankByPontuationRepository,
    private readonly createUserRankRepository: CreateUserRankRepository,
    private readonly updateUserRankRepository: UpdateUserRankRepository,
    private readonly messageBroker: MessageBroker,
  ) {}

  async process(
    parameters: ProcessUserRankUseCase.Parameters,
  ): Promise<ProcessUserRankUseCase.Result> {
    const userRank = await this.findUserRankRepository.find({
      userId: parameters.userId,
    });

    const newPontuation = userRank
      ? (userRank.pontuation += parameters.pontuation)
      : parameters.pontuation;

    const rank = await this.findRankByPontuationRepository.findByPontuation({
      pontuation: newPontuation,
    });

    if (!rank) {
      throw new RankNotFoundError();
    }

    const now = new Date();
    if (!userRank) {
      await this.createUserRankRepository.create({
        userId: parameters.userId,
        pontuation: newPontuation,
        rankId: rank.id,
        createdAt: now,
      });
    } else {
      await this.updateUserRankRepository.update({
        id: userRank.id,
        pontuation: newPontuation,
        rankId: rank.id,
      });
    }

    await this.messageBroker.sendMessage({
      topicName: 'user_rank_updated',
      message: {
        userId: parameters.userId,
        pontuation: newPontuation,
        rank,
        updatedAt: now,
      },
    });
  }
}
