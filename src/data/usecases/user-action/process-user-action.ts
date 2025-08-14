import {
  CreateUserActionRepository,
  FindActionsRepository,
} from '@rank-service/data/protocols/db';
import { ProcessUserActionUseCase } from '@rank-service/domain/usecases';
import { MessageBroker } from '@rank-service/data/protocols/message-broker';
import { ActionKind } from '@rank-service/domain/enums';
import { ActionNotFoundError } from '@rank-service/domain/errors';

export class ProcessUserAction implements ProcessUserActionUseCase {
  constructor(
    private readonly findActionsRepository: FindActionsRepository,
    private readonly createUserActionRepository: CreateUserActionRepository,
    private readonly messageBroker: MessageBroker,
  ) {}

  async process(
    parameters: ProcessUserActionUseCase.Parameters,
  ): Promise<ProcessUserActionUseCase.Result> {
    const relationActionKind = {
      CREATED_LIKE: ActionKind.RECEIVED_LIKE_IN_REVIEW,
      CREATED_COMMENT: ActionKind.RECEIVED_COMMENT_IN_REVIEW,
      DELETED_LIKE: ActionKind.DELETED_LIKE_IN_REVIEW,
      DELETED_COMMENT: ActionKind.DELETED_COMMENT_IN_REVIEW,
    };

    const kinds: ActionKind[] = [parameters.kind];
    const actionOfOtherUser = relationActionKind[parameters.kind];

    if (actionOfOtherUser) {
      kinds.push(actionOfOtherUser);
    }

    const actions = await this.findActionsRepository.find({
      kinds,
    });

    const actionUser = actions.find(
      (action) => action.kind === parameters.kind,
    );

    if (!actionUser) {
      throw new ActionNotFoundError();
    }

    const actionOtherUser = actions.find(
      (action) => action.kind === actionOfOtherUser,
    );

    const now = new Date();
    const userActions: CreateUserActionRepository.Parameters = [
      {
        userId: parameters.userId,
        actionId: actionUser.id,
        actionCreatedAt: parameters.actionCreatedAt,
        createdAt: now,
      },
    ];
    const messages = [
      {
        userId: parameters.userId,
        pontuation: actionUser.pontuation,
      },
    ];

    if (actionOtherUser) {
      userActions.push({
        userId: parameters.review!.userId,
        actionId: actionOtherUser.id,
        actionCreatedAt: parameters.actionCreatedAt,
        createdAt: now,
      });

      messages.push({
        userId: parameters.review!.userId,
        pontuation: actionOtherUser.pontuation,
      });
    }

    await this.createUserActionRepository.create(userActions);
    await this.messageBroker.sendMessage({
      topicName: 'process_user_rank',
      message: messages,
    });
  }
}
