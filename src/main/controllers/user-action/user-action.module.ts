import { BuildProcessUserActionListener } from '@rank-service/main/factories/listeners';
import { FactoryModule } from '@rank-service/main/factories/usecases/factory.module';
import { Module } from '@nestjs/common';
import { UserActionController } from './user-action.controller';

@Module({
  imports: [FactoryModule],
  controllers: [UserActionController],
  providers: [BuildProcessUserActionListener],
})
export class UserActionModule {}
