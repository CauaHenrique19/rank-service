import { ProcessUserRankUseCase } from '@rank-service/domain/usecases';
import {
  Listener,
  ListenerResponse,
} from '@rank-service/presentation/protocols';

export class ProcessUserRankListener implements Listener {
  constructor(private readonly processUserRank: ProcessUserRankUseCase) {}

  async listen(
    parameters: ProcessUserRankListener.Parameters,
  ): Promise<ListenerResponse> {
    try {
      await this.processUserRank.process(parameters);
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

export namespace ProcessUserRankListener {
  export type Parameters = ProcessUserRankUseCase.Parameters;
}
