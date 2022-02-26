import readline from "readline";

interface IInput {
  type(message: string): Promise<string>;
  answer(message: string): void;
}

export class Input implements IInput {
  private rl;
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
  }
  async type(message: string): Promise<string> {
    return await new Promise<string>((resolve) => this.rl.question(message, (input) => resolve(input)));
  }
  answer(message: string) {
    this.rl.write(`${message}\n`);
  }
}
