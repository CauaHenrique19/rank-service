import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { listenerAdapter } from '@rank-service/main/adapters';
import { ProcessUserActionDTO } from '@rank-service/main/controllers/user-rank/dto';
import { BuildProcessUserRankListener } from '@rank-service/main/factories/listeners';
import {
  handleCommitOffsetKafka,
  handleRetryKafka,
} from '@rank-service/main/utils';

@Controller('user-rank')
export class UserRankController {
  private readonly logger = new Logger(UserRankController.name, {
    timestamp: true,
  });

  constructor(
    private readonly buildProcessUserRankListener: BuildProcessUserRankListener,
  ) {}

  @MessagePattern('process_user_rank')
  async processUserRank(
    @Payload() userRank: ProcessUserActionDTO,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const result = await listenerAdapter(
      this.buildProcessUserRankListener.build(),
      {
        userId: userRank.userId,
        pontuation: userRank.pontuation,
      },
    );

    if (result.processed) {
      await handleCommitOffsetKafka(context);
    } else {
      await handleRetryKafka(context, result.error, this.logger);
    }
  }
}
