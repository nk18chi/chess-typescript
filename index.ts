import { Game } from "./game";

(async () => {
  const game = new Game();
  await game.start();
  while (await game.isContinue()) {
    await game.start();
  }
  game.end();
})();
