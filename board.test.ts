import { Board } from "./board";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { PLAYER_COLOR } from "./playerColor";

const defaultBoardPosition = [
  [
    new Rook({ color: PLAYER_COLOR.BLACK }),
    new Knight({ color: PLAYER_COLOR.BLACK }),
    new Bishop({ color: PLAYER_COLOR.BLACK }),
    new Queen({ color: PLAYER_COLOR.BLACK }),
    new King({ color: PLAYER_COLOR.BLACK }),
    new Bishop({ color: PLAYER_COLOR.BLACK }),
    new Knight({ color: PLAYER_COLOR.BLACK }),
    new Rook({ color: PLAYER_COLOR.BLACK }),
  ],
  [
    new Pawn({ color: PLAYER_COLOR.BLACK }),
    new Pawn({ color: PLAYER_COLOR.BLACK }),
    new Pawn({ color: PLAYER_COLOR.BLACK }),
    new Pawn({ color: PLAYER_COLOR.BLACK }),
    new Pawn({ color: PLAYER_COLOR.BLACK }),
    new Pawn({ color: PLAYER_COLOR.BLACK }),
    new Pawn({ color: PLAYER_COLOR.BLACK }),
    new Pawn({ color: PLAYER_COLOR.BLACK }),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    new Pawn({ color: PLAYER_COLOR.WHITE }),
    new Pawn({ color: PLAYER_COLOR.WHITE }),
    new Pawn({ color: PLAYER_COLOR.WHITE }),
    new Pawn({ color: PLAYER_COLOR.WHITE }),
    new Pawn({ color: PLAYER_COLOR.WHITE }),
    new Pawn({ color: PLAYER_COLOR.WHITE }),
    new Pawn({ color: PLAYER_COLOR.WHITE }),
    new Pawn({ color: PLAYER_COLOR.WHITE }),
  ],
  [
    new Rook({ color: PLAYER_COLOR.WHITE }),
    new Knight({ color: PLAYER_COLOR.WHITE }),
    new Bishop({ color: PLAYER_COLOR.WHITE }),
    new Queen({ color: PLAYER_COLOR.WHITE }),
    new King({ color: PLAYER_COLOR.WHITE }),
    new Bishop({ color: PLAYER_COLOR.WHITE }),
    new Knight({ color: PLAYER_COLOR.WHITE }),
    new Rook({ color: PLAYER_COLOR.WHITE }),
  ],
];

const BOARD_NUMBER = 8;
describe("Board", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(BOARD_NUMBER);
  });

  describe("constructor", () => {
    describe("initialize", () => {
      it("should correctly set pieces on board", () => {
        board.initialize();
        expect(board["cells"]).toStrictEqual(defaultBoardPosition);
      });
      it("should set aliveKingsMap", () => {
        board.initialize();
        expect(board["aliveKingsMap"][PLAYER_COLOR.WHITE]).toBe(true);
        expect(board["aliveKingsMap"][PLAYER_COLOR.BLACK]).toBe(true);
      });
    });
    describe("show", () => {
      it("should correctly show initial position of pieces on board", () => {
        console.log = jest.fn();
        board.initialize();
        board.show();
        expect(console.log).toHaveBeenCalledWith("");
        expect(console.log).toHaveBeenCalledWith("♜|♞|♝|♛|♚|♝|♞|♜ 8");
        expect(console.log).toHaveBeenCalledWith("♟|♟|♟|♟|♟|♟|♟|♟ 7");
        expect(console.log).toHaveBeenCalledWith(" | | | | | | |  6");
        expect(console.log).toHaveBeenCalledWith(" | | | | | | |  5");
        expect(console.log).toHaveBeenCalledWith(" | | | | | | |  4");
        expect(console.log).toHaveBeenCalledWith(" | | | | | | |  3");
        expect(console.log).toHaveBeenCalledWith("♙|♙|♙|♙|♙|♙|♙|♙ 2");
        expect(console.log).toHaveBeenCalledWith("♖|♘|♗|♕|♔|♗|♘|♖ 1");
        expect(console.log).toHaveBeenCalledWith("");
        expect(console.log).toHaveBeenCalledWith("a b c d e f g h");
      });
    });
    describe("parsePosition", () => {
      it("should return position containing row/col", () => {
        expect(board.parsePosition("a1")).toStrictEqual({ col: 0, row: 7 });
        expect(board.parsePosition("A1")).toStrictEqual({ col: 0, row: 7 });
        expect(board.parsePosition("b2")).toStrictEqual({ col: 1, row: 6 });
      });
      it("should throw an error if an unexpected text is passed", () => {
        expect(() => board.parsePosition("")).toThrow("wrong type..");
        expect(() => board.parsePosition("aa10")).toThrow("wrong type..");
      });
    });
    describe("update", () => {
      it("should move a piece and update the board", () => {
        board.initialize();
        board.update(PLAYER_COLOR.WHITE, { col: 0, row: 6 }, { col: 0, row: 5 });
        const expeced = defaultBoardPosition;

        expeced[5][0] = expeced[6][0];
        if (expeced[5][0]) expeced[5][0]["isMoved"] = true;
        expeced[6][0] = null;
        expect(board["cells"]).toStrictEqual(expeced);
      });
      it("should call the methods in Piece proper times as expected", () => {
        board.initialize();
        board.update(PLAYER_COLOR.WHITE, { col: 0, row: 6 }, { col: 0, row: 5 });
        if (!board["cells"][6][0]) return;
        const spyValidate = jest.spyOn(board["cells"][6][0], "validate");
        const spyMoved = jest.spyOn(board["cells"][6][0], "moved");
        expect(spyValidate).toBeCalledTimes(1);
        expect(spyMoved).toBeCalledTimes(1);
      });
      it("should change the value of alive king to false if the king is taken", () => {
        board.initialize();
        board["cells"][1][4] = null;
        board["cells"][6][4] = board["cells"][7][3];
        expect(board["aliveKingsMap"][PLAYER_COLOR.BLACK]).toBe(true);
        board.update(PLAYER_COLOR.WHITE, { col: 4, row: 6 }, { col: 4, row: 0 });
        expect(board["aliveKingsMap"][PLAYER_COLOR.BLACK]).toBe(false);
      });
      it("should throw an error if the position is out of the board", () => {
        const errorOutOfBoard = "your select is out of the board";
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: -1, row: 6 }, { col: 0, row: 5 })).toThrow(errorOutOfBoard);
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 8, row: 6 }, { col: 0, row: 5 })).toThrow(errorOutOfBoard);

        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: -1 }, { col: 0, row: 5 })).toThrow(errorOutOfBoard);
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 8 }, { col: 0, row: 5 })).toThrow(errorOutOfBoard);

        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 6 }, { col: -1, row: 5 })).toThrow(errorOutOfBoard);
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 6 }, { col: 8, row: 5 })).toThrow(errorOutOfBoard);

        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 6 }, { col: 0, row: -1 })).toThrow(errorOutOfBoard);
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 6 }, { col: 0, row: 8 })).toThrow(errorOutOfBoard);
      });
      it("should throw an error if there is no piece that a player is trying to select", () => {
        board.initialize();
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 5 }, { col: 0, row: 4 })).toThrow(
          "there is no piece that you are trying to move"
        );
      });
      it("should throw an error if the selected piece is not yours", () => {
        board.initialize();
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 1 }, { col: 0, row: 2 })).toThrow(
          "the piece that you are trying to move is not yours"
        );
      });
      it("should throw an error if a player is trying to capture theirs", () => {
        board.initialize();
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 7 }, { col: 1, row: 7 })).toThrow(
          "the piece that you are trying to capture is yours"
        );
      });
      it("should throw an error if a selected piece try to move as unexpected", () => {
        board.initialize();
        if (board["cells"][6][0]) jest.spyOn(board["cells"][6][0], "validate").mockReturnValue(false);
        expect(() => board.update(PLAYER_COLOR.WHITE, { col: 0, row: 6 }, { col: 0, row: 5 })).toThrow("the piece cannot move to the destination");
      });
      it("should not change the value of alive king if the king is not taken", () => {
        board.initialize();
        board["cells"][1][4] = null;
        board["cells"][6][4] = board["cells"][7][3];
        expect(board["aliveKingsMap"][PLAYER_COLOR.BLACK]).toBe(true);
        board.update(PLAYER_COLOR.WHITE, { col: 4, row: 6 }, { col: 4, row: 1 });
        expect(board["aliveKingsMap"][PLAYER_COLOR.BLACK]).toBe(true);
      });
    });
    describe("isKing", () => {
      it("should change the value of alive king to false if the king is taken", () => {
        board.initialize();
        board["cells"][1][4] = null;
        board["cells"][6][4] = board["cells"][7][3];
        expect(board.isKing(PLAYER_COLOR.WHITE)).toBe(true);
        expect(board.isKing(PLAYER_COLOR.BLACK)).toBe(true);
        board.update(PLAYER_COLOR.WHITE, { col: 4, row: 6 }, { col: 4, row: 0 });
        expect(board.isKing(PLAYER_COLOR.WHITE)).toBe(true);
        expect(board.isKing(PLAYER_COLOR.BLACK)).toBe(false);
      });
    });
  });
});
