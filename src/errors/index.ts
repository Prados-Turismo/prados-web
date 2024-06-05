export class Warning {
  public readonly message!: string[];
  public readonly code: number;

  constructor(message: string | string[], code = 500) {
    this.code = code;

    if (typeof message === "string") {
      this.message = [message];
    }

    if (Array.isArray(message)) {
      this.message = message;
    }
  }
}
