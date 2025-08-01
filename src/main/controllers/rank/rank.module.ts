import {
  BuildCreateRankController,
  BuildFindRanksController,
} from '@rank-service/main/factories/controllers';
import { FactoryModule } from '@rank-service/main/factories/usecases/factory.module';
import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';

@Module({
  imports: [FactoryModule],
  controllers: [RankController],
  providers: [BuildCreateRankController, BuildFindRanksController],
})
export class RankModule {}
