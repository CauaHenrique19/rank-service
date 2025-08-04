import { ProcessUserActionUseCase } from '@rank-service/domain/usecases';
import {
  Listener,
  ListenerResponse,
} from '@rank-service/presentation/protocols';

export class ProcessUserActionListener implements Listener {
  constructor(private readonly processUserAction: ProcessUserActionUseCase) {}

  async listen(
    parameters: ProcessUserActionListener.Parameters,
  ): Promise<ListenerResponse> {
    try {
      await this.processUserAction.process(parameters);
      return {
        processed: true,
      };
    } catch (error) {
      return {
        processed: false,
        error,
      };
    }
  }
}

export namespace ProcessUserActionListener {
  export type Parameters = ProcessUserActionUseCase.Parameters;
}
