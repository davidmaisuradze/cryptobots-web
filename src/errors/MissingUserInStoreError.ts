import { CustomError } from './CustomError';

export class MissingUserInStoreError extends CustomError {
  constructor() {
    super('Missing user in store');
  }
}
