export interface ProcessUserRankUseCase {
  process(
    parameters: ProcessUserRankUseCase.Parameters,
  ): Promise<ProcessUserRankUseCase.Result>;
}

export namespace ProcessUserRankUseCase {
  export type Parameters = { userId: string; pontuation: number };
  export type Result = void;
}
