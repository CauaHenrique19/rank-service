import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { ActionKind } from '@rank-service/domain/enums';

import { listenerAdapter } from '@rank-service/main/adapters';
import {
  CreatedCommentDTO,
  CreatedLikeDTO,
  CreatedReviewDTO,
  DeletedCommentDTO,
  DeletedLikeDTO,
  DeletedReviewDTO,
} from '@rank-service/main/controllers/user-action/dto';
import { BuildProcessUserActionListener } from '@rank-service/main/factories/listeners';
import {
  handleCommitOffsetKafka,
  handleRetryKafka,
} from '@rank-service/main/utils';

@Controller('user-action')
export class UserActionController {
  private readonly logger = new Logger(UserActionController.name, {
    timestamp: true,
  });

  constructor(
    private readonly buildProcessUserActionListener: BuildProcessUserActionListener,
  ) {}

  @MessagePattern('created_review')
  async processCreatedReview(
    @Payload() review: CreatedReviewDTO,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const result = await listenerAdapter(
      this.buildProcessUserActionListener.build(),
      {
        userId: review.userId,
        actionCreatedAt: review.createdAt,
        kind: ActionKind.CREATED_REVIEW,
      },
    );

    if (result.processed) {
      await handleCommitOffsetKafka(context);
    } else {
      await handleRetryKafka(context, result.error, this.logger);
    }
  }

  @MessagePattern('deleted_review')
  async processDeletedReview(
    @Payload() review: DeletedReviewDTO,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const result = await listenerAdapter(
      this.buildProcessUserActionListener.build(),
      {
        userId: review.userId,
        actionCreatedAt: review.createdAt,
        kind: ActionKind.DELETED_REVIEW,
      },
    );

    if (result.processed) {
      await handleCommitOffsetKafka(context);
    } else {
      await handleRetryKafka(context, result.error, this.logger);
    }
  }

  @MessagePattern('created_like')
  async processCreatedLike(
    @Payload() like: CreatedLikeDTO,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const result = await listenerAdapter(
      this.buildProcessUserActionListener.build(),
      {
        userId: like.userId,
        actionCreatedAt: like.createdAt,
        review: like.review,
        kind: ActionKind.CREATED_LIKE,
      },
    );

    if (result.processed) {
      await handleCommitOffsetKafka(context);
    } else {
      await handleRetryKafka(context, result.error, this.logger);
    }
  }

  @MessagePattern('deleted_like')
  async processDeletedLike(
    @Payload() like: DeletedLikeDTO,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const result = await listenerAdapter(
      this.buildProcessUserActionListener.build(),
      {
        userId: like.userId,
        actionCreatedAt: like.createdAt,
        review: like.review,
        kind: ActionKind.DELETED_LIKE,
      },
    );

    if (result.processed) {
      await handleCommitOffsetKafka(context);
    } else {
      await handleRetryKafka(context, result.error, this.logger);
    }
  }

  @MessagePattern('created_comment')
  async processCreatedComment(
    @Payload() comment: CreatedCommentDTO,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const result = await listenerAdapter(
      this.buildProcessUserActionListener.build(),
      {
        userId: comment.userId,
        actionCreatedAt: comment.createdAt,
        review: comment.review,
        kind: ActionKind.CREATED_COMMENT,
      },
    );

    if (result.processed) {
      await handleCommitOffsetKafka(context);
    } else {
      await handleRetryKafka(context, result.error, this.logger);
    }
  }

  @MessagePattern('deleted_comment')
  async processDeletedComment(
    @Payload() comment: DeletedCommentDTO,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const result = await listenerAdapter(
      this.buildProcessUserActionListener.build(),
      {
        userId: comment.userId,
        actionCreatedAt: comment.createdAt,
        review: comment.review,
        kind: ActionKind.DELETED_COMMENT,
      },
    );

    if (result.processed) {
      await handleCommitOffsetKafka(context);
    } else {
      await handleRetryKafka(context, result.error, this.logger);
    }
  }
}
