import { Inject, Injectable } from '@nestjs/common';

import { Listener } from '@rank-service/presentation/protocols';
import { ProcessUserActionUseCase } from '@rank-service/domain/usecases';
import { PROCESS_USER_ACTION_FACTORY } from '@rank-service/main/factories/providers';
import { ProcessUserActionListener } from '@rank-service/presentation/listeners';

@Injectable()
export class BuildProcessUserActionListener {
  constructor(
    @Inject(PROCESS_USER_ACTION_FACTORY)
    private readonly processUserAction: ProcessUserActionUseCase,
  ) {}

  public build(): Listener {
    const listener = new ProcessUserActionListener(this.processUserAction);
    return listener;
  }
}
