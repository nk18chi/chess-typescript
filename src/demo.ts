import { delay } from "./constant";
import { Game } from "./game";

(async () => {
  const game = new Game();
  game.start();
  for (const cmd of [
    "help",
    "moves",
    "board",
    "f2f4",
    "f7f6",
    "g1f3",
    "e7e5",
    "g2g4",
    "d7d6",
    "f1h3",
    "g7g5",
    "e1g1",
    "e5e4",
    "d2d4",
    "e4d3",
    "f4f5",
    "d3e2",
    "d1d4",
    "e2f1",
    "board",
    "e2f1q",
    "g1f1",
    "d6d4",
    "help",
    "d6",
    "d6d5",
    "d4e5",
    "d8d6",
    "e5e8",
  ]) {
    await delay(1000);
    for (const char of cmd) {
      process.stdout.write(char);
      await delay(100);
    }
    console.log(cmd);
    console.clear();
    game.input.answer(cmd);
  }

  await delay(300);
  game.isContinue();
  await delay(1000);

  console.log("no");
  game.end();
})();
