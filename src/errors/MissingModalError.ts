import { CustomError } from "./CustomError";

export class MissingModalError extends CustomError {
  constructor(modalId: string) {
    super(`Modal with id ${modalId} is doesn't open`);
  }
}
