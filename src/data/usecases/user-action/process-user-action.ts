import {
  CreateUserActionRepository,
  CreateUserRankRepository,
  FindActionRepository,
  FindRankByPontuationRepository,
  FindUserRankRepository,
  UpdateUserRankRepository,
} from '@rank-service/data/protocols/db';
import { ProcessUserActionUseCase } from '@rank-service/domain/usecases';
import {
  ActionNotFoundError,
  RankNotFoundError,
} from '@rank-service/domain/errors';
import { MessageBroker } from '@rank-service/data/protocols/message-broker';

export class ProcessUserAction implements ProcessUserActionUseCase {
  constructor(
    private readonly findActionRepository: FindActionRepository,
    private readonly createUserActionRepository: CreateUserActionRepository,
    private readonly findUserRankRepository: FindUserRankRepository,
    private readonly findRankByPontuationRepository: FindRankByPontuationRepository,
    private readonly createUserRankRepository: CreateUserRankRepository,
    private readonly updateUserRankRepository: UpdateUserRankRepository,
    private readonly messageBroker: MessageBroker,
  ) {}

  async process(
    parameters: ProcessUserActionUseCase.Parameters,
  ): Promise<ProcessUserActionUseCase.Result> {
    const action = await this.findActionRepository.findOne({
      kind: parameters.kind,
    });

    if (!action) {
      throw new ActionNotFoundError();
    }

    const now = new Date();
    await this.createUserActionRepository.create({
      userId: parameters.userId,
      actionId: action.id,
      actionCreatedAt: parameters.actionCreatedAt,
      createdAt: now,
    });

    const userRank = await this.findUserRankRepository.find({
      userId: parameters.userId,
    });

    const newPontuation = userRank
      ? (userRank.pontuation += action.pontuation)
      : action.pontuation;

    const rank = await this.findRankByPontuationRepository.findByPontuation({
      pontuation: newPontuation,
    });

    if (!rank) {
      throw new RankNotFoundError();
    }

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
      },
    });
  }
}
