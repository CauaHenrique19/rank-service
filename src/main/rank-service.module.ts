import { Module } from '@nestjs/common';

import { TypeormModule } from '@rank-service/infra/orm/typeorm/typeorm.module';
import { RankModule } from '@rank-service/main/controllers/rank/rank.module';

@Module({
  imports: [TypeormModule, RankModule],
})
export class RankServiceModule {}
