export class ActionNotFoundError extends Error {
  constructor() {
    super('Action Not Found');
    this.name = 'ActionNotFoundError';
  }
}
