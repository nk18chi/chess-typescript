import { Game } from "./game";
import { Board } from "./board";
import { Input } from "./input";
import { PLAYER_COLOR } from "./playerColor";
import * as inputOriginal from "./input";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Board class is mock: This is my original code so unit testing for board is necessary.
 * Input class is spy: This is based on readline libarary so unit testing is not necessary.
 */

jest.mock("./board.ts");
const BoardActual = jest.requireActual("./board");
const BOARD_NUMBER = 8;

describe("Game", () => {
  const original = inputOriginal.Input;
  beforeEach(() => {
    jest.spyOn(inputOriginal, "Input").mockImplementation(() => {
      return new original();
    });
  });
  afterEach(() => {
    (Board as jest.Mock).mockRestore();
    (Input as jest.Mock).mockRestore();
  });

  describe("constructor", () => {
    it("board and input class are called", () => {
      new Game();
      expect(Board).toBeCalledTimes(1);
      expect(Input).toBeCalledTimes(1);
    });
  });

  describe("start", () => {
    it("call board methods", async () => {
      const game = new Game();
      const spyInitialize = jest.spyOn(game["board"], "initialize");
      const spyShow = jest.spyOn(game["board"], "show");
      const spyIsKing = jest.spyOn(game["board"], "isKing");

      console.log = jest.fn();

      game.start();
      await delay(1000);

      expect(spyInitialize).toBeCalledTimes(1);
      expect(spyShow).toBeCalledTimes(1);
      expect(spyIsKing).toBeCalledTimes(1);
    });
    it("show the start message", () => {
      console.log = jest.fn();
      const game = new Game();
      game.start();
      expect(console.log).toHaveBeenCalledWith("Game Start!");
    });
    it("command 'help'", async () => {
      console.log = jest.fn();
      const game = new Game();
      const spyIsKing = jest.spyOn(game["board"], "isKing");
      spyIsKing.mockImplementation(() => {
        return true;
      });

      game.start();
      for (const cmd of ["help"]) {
        game.input.answer(cmd);
        await delay(1000);
      }

      expect(console.log).toHaveBeenCalledWith("* type 'help' for help");
      expect(console.log).toHaveBeenCalledWith("* type 'board' to see the board again");
      expect(console.log).toHaveBeenCalledWith("* type 'resign' to resign");
      expect(console.log).toHaveBeenCalledWith("* type 'moves' to list all possible moves");
      expect(console.log).toHaveBeenCalledWith("* type a square(ex. b1, e2) to list possible moves for that squares");
      expect(console.log).toHaveBeenCalledWith("* type UCI(ex. b1c3, e7e8q) to make a move");
    });
    it("command 'board'", async () => {
      console.log = jest.fn();
      const game = new Game();
      const spyIsKing = jest.spyOn(game["board"], "isKing");
      const spyShow = jest.spyOn(game["board"], "show");
      spyIsKing.mockImplementation(() => {
        return true;
      });

      game.start();
      for (const cmd of ["board"]) {
        game.input.answer(cmd);
        await delay(1000);
      }

      expect(spyShow).toBeCalledTimes(2);
    });
    it("command 'resign'", async () => {
      console.log = jest.fn();
      const game = new Game();
      const spyIsKing = jest.spyOn(game["board"], "isKing");
      spyIsKing.mockImplementation(() => {
        return true;
      });

      game.start();
      for (const cmd of ["resign"]) {
        game.input.answer(cmd);
        await delay(1000);
      }

      expect(console.log).toHaveBeenCalledWith("BLACK won!\n");
      expect(console.log).toHaveBeenCalledWith("WHITE: 0");
      expect(console.log).toHaveBeenCalledWith("BLACK: 1");
    });
    describe("command moving a pirce", () => {
      it("should correctly move a piece in turns", async () => {
        console.log = jest.fn();
        const game = new Game();
        const board = new Board(BOARD_NUMBER);
        board["mapSize"] = BOARD_NUMBER;
        const spyIsKing = jest.spyOn(game["board"], "isKing");
        spyIsKing.mockImplementation(() => {
          return true;
        });
        const spyShow = jest.spyOn(game["board"], "show");
        const spyUpdate = jest.spyOn(game["board"], "update");
        const spyParsePosition = jest.spyOn(game["board"], "parsePosition");
        spyParsePosition.mockImplementation((position: string) => {
          const b = new BoardActual.Board(BOARD_NUMBER);
          return b.parsePosition(position);
        });

        game.start();
        for (const cmd of ["a2a3", "a7a6"]) {
          game.input.answer(cmd);
          await delay(1000);
        }

        expect(console.log).toHaveBeenCalledWith("WHITE to move");
        expect(spyUpdate.mock.calls[0][0]).toBe(PLAYER_COLOR.WHITE);
        expect(spyUpdate.mock.calls[0][1]).toStrictEqual({ row: 6, col: 0 });
        expect(spyUpdate.mock.calls[0][2]).toStrictEqual({ row: 5, col: 0 });

        expect(console.log).toHaveBeenCalledWith("BLACK to move");
        expect(spyUpdate.mock.calls[1][0]).toBe(PLAYER_COLOR.BLACK);
        expect(spyUpdate.mock.calls[1][1]).toStrictEqual({ row: 1, col: 0 });
        expect(spyUpdate.mock.calls[1][2]).toStrictEqual({ row: 2, col: 0 });

        expect(console.log).toHaveBeenCalledWith("WHITE to move");

        expect(spyUpdate).toBeCalledTimes(2);
        expect(spyShow).toBeCalledTimes(3);
      });
    });
  });

  describe("end", () => {
    it("show the end message", () => {
      console.log = jest.fn();
      const game = new Game();
      game.end();
      expect(console.log).toHaveBeenCalledWith("Game End!");
    });
  });

  describe("isContinue method", () => {
    it("answer: yes", async () => {
      console.log = jest.fn();
      const game = new Game();
      const spyIsContinue = jest.spyOn(game, "isContinue");

      let answer;
      game.isContinue().then((res) => {
        answer = res;
      });
      for (const cmd of ["yes"]) {
        game.input.answer(cmd);
        await delay(1000);
      }
      expect(answer).toBe(true);
      expect(spyIsContinue).toBeCalledTimes(1);
    });
    it("answer: no", async () => {
      console.log = jest.fn();
      const game = new Game();
      const spyIsContinue = jest.spyOn(game, "isContinue");

      let answer;
      game.isContinue().then((res) => {
        answer = res;
      });
      for (const cmd of ["no"]) {
        game.input.answer(cmd);
        await delay(1000);
      }
      expect(answer).toBe(false);
      expect(spyIsContinue).toBeCalledTimes(1);
    });
    it("answer: out of choices", async () => {
      console.log = jest.fn();
      const game = new Game();
      const spyIsContinue = jest.spyOn(game, "isContinue");

      let answer;
      game.isContinue().then((res) => {
        answer = res;
      });
      for (const cmd of ["something", "yes"]) {
        game.input.answer(cmd);
        await delay(1000);
      }
      expect(answer).toBe(true);
      expect(spyIsContinue).toBeCalledTimes(2);
    });
  });
});
