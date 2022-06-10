export class CustomError extends Error {
  public reference: string;

  constructor(reference: string) {
    super(reference);
    this.reference = reference;
  }
}
