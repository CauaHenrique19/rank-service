import {
  BuildCreateActionController,
  BuildFindActionsController,
} from '@rank-service/main/factories/controllers';
import { FactoryModule } from '@rank-service/main/factories/usecases/factory.module';
import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';

@Module({
  imports: [FactoryModule],
  controllers: [ActionController],
  providers: [BuildCreateActionController, BuildFindActionsController],
})
export class ActionModule {}
