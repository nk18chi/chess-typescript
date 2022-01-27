import readline from "readline";

interface IInput {
  type(message: string): Promise<string>;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
export class Input implements IInput {
  async type(message: string): Promise<string> {
    return await new Promise<string>((resolve) => rl.question(message, (input) => resolve(input)));
  }
}
