import { Module } from '@nestjs/common';

import { TypeormModule } from '@rank-service/infra/orm/typeorm/typeorm.module';
import { RankModule } from '@rank-service/main/controllers/rank/rank.module';
import { ActionModule } from '@rank-service/main/controllers/action/action.module';
import { UserActionModule } from '@rank-service/main/controllers/user-action/user-action.module';
import { UserRankModule } from '@rank-service/main/controllers/user-rank/user-rank.module';

@Module({
  imports: [
    TypeormModule,
    RankModule,
    ActionModule,
    UserActionModule,
    UserRankModule,
  ],
})
export class RankServiceModule {}
