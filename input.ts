import * as readline from "readline";

interface IInput {
  type(): Promise<string>;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
export class Input implements IInput {
  async type(): Promise<string> {
    return await new Promise<string>((resolve) => rl.question("Enter UCI(type 'help' for help)", (input) => resolve(input)));
  }
}
