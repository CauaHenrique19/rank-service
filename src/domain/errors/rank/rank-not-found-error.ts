export class RankNotFoundError extends Error {
  constructor() {
    super('Rank Not Found');
    this.name = 'RankNotFoundError';
  }
}
