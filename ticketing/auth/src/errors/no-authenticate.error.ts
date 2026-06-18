import { AbstractCustomError } from "./custom-error-abstract";

export class NoAuthenicateError extends AbstractCustomError {
  statusCode = 401;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NoAuthenicateError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
