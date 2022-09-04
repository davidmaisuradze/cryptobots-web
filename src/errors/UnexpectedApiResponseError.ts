import { CustomError } from './CustomError';

export class UnexpectedApiResponseError extends CustomError {
  constructor() {
    super('Unexpected API response');
  }
}
