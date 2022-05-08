import { sortPositionFunc, TMove } from "../types/piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { TPosition } from "../types/position";
import { Piece } from "./piece";

const cells = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, new Piece({ color: PLAYER_COLOR.BLACK }), null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, new Piece({ color: PLAYER_COLOR.WHITE }), null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

describe("Piece", () => {
  describe("show", () => {
    it(`should return the sign of a piece`, async () => {
      const piece = new Piece({ color: PLAYER_COLOR.WHITE });
      expect(piece.show()).toBe(null);
    });
  });
  describe("moved", () => {
    it(`should change the value of moved after moving a piece`, async () => {
      const piece = new Piece({ color: PLAYER_COLOR.WHITE });
      expect(piece.lastMovedTurn).toBe(0);
      piece.moved({ x: 0, y: 0 }, 1);
      expect(piece.lastMovedTurn).toBe(1);
    });
  });
  describe("validate", () => {
    it(`should avoid staying at the same position as a move`, async () => {
      const piece = new Piece({ color: PLAYER_COLOR.WHITE });
      expect(piece.validate({ x: 0, y: 0 }, false)).toBe(false);
      expect(piece.validate({ x: 1, y: 0 }, false)).toBe(true);
    });
  });
  describe("listMoves method", () => {
    [PLAYER_COLOR.WHITE, PLAYER_COLOR.BLACK].forEach((color) => {
      it(`should return proper moves with ${PLAYER_COLOR[color]} turn`, async () => {
        const piece = new Piece({ color });
        const moves: TMove[] = [
          { row: 2, col: 1 },
          { row: 1, col: 0 },
          { row: -1, col: 0 },
          { row: 1, col: 1, isRepeat: true },
        ];
        const curPosition: TPosition = { row: 4, col: 4 };
        const direction = PLAYER_COLOR.WHITE === color ? -1 : 1;
        expect(piece.listMoves({ moves, curPosition, cells }).sort(sortPositionFunc)).toStrictEqual(
          [
            { row: 2 * direction + curPosition.row, col: 1 + curPosition.col },
            { row: 1 * direction + curPosition.row, col: 0 + curPosition.col },
            // { row: 1 * direction + curPosition.row, col: 0 + curPosition.col }, // cannot capture because it is yours
            { row: 1 * 1 * direction + curPosition.row, col: 1 * 1 + curPosition.col },
            { row: 1 * 2 * direction + curPosition.row, col: 1 * 2 + curPosition.col },
            { row: 1 * 3 * direction + curPosition.row, col: 1 * 3 + curPosition.col },
          ].sort(sortPositionFunc)
        );
      });
    });
    it(`should return an empty array if move is null`, async () => {
      const piece = new Piece({ color: PLAYER_COLOR.WHITE });
      expect(piece.listMoves({ curPosition: { row: 4, col: 4 }, cells }).sort(sortPositionFunc)).toStrictEqual([]);
    });
  });
});
