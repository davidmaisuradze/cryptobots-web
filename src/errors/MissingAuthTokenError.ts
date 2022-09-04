import { CustomError } from './CustomError';

export class MissingAuthTokenError extends CustomError {
  constructor() {
    super('Missing auth token');
  }
}
