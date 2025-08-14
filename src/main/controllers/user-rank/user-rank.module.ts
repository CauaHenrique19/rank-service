import { BuildProcessUserRankListener } from '@rank-service/main/factories/listeners';
import { FactoryModule } from '@rank-service/main/factories/usecases/factory.module';
import { Module } from '@nestjs/common';
import { UserRankController } from './user-rank.controller';

@Module({
  imports: [FactoryModule],
  controllers: [UserRankController],
  providers: [BuildProcessUserRankListener],
})
export class UserRankModule {}
