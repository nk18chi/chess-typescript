import { sortPositionFunc } from "../types/piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { Queen } from "./queen";

const testcases = [
  {
    description: "success to move",
    axis: { x: 2, y: 2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 2, y: 0 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 2, y: -2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 0, y: -2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -2, y: -2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -2, y: 0 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -2, y: 2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 0, y: 2 },
    expected: true,
  },
  {
    description: "fail to move",
    axis: { x: 1, y: 2 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 0 },
    expected: false,
  },
];

const cells = [
  [null, null, null, null, null, null, null, null],
  [null, new Queen({ color: PLAYER_COLOR.BLACK }), null, null, new Queen({ color: PLAYER_COLOR.BLACK }), null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, new Queen({ color: PLAYER_COLOR.WHITE }), null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, new Queen({ color: PLAYER_COLOR.WHITE }), null, null, null],
  [null, null, null, null, null, null, null, null],
];

describe("Queen", () => {
  describe("validate method", () => {
    testcases.forEach((testcase) => {
      it(`${testcase.description} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new Queen({ color: PLAYER_COLOR.WHITE });
        expect(piece.validate(testcase.axis, false)).toBe(testcase.expected);
      });
    });
  });
  describe("listMoves method", () => {
    it(`should return proper moves`, async () => {
      const piece = new Queen({ color: PLAYER_COLOR.WHITE });
      expect(piece.listMoves({ curPosition: { row: 4, col: 4 }, cells }).sort(sortPositionFunc)).toStrictEqual(
        [
          { row: 1, col: 1 },
          { row: 2, col: 2 },
          { row: 3, col: 3 },
          { row: 5, col: 5 },
          { row: 6, col: 6 },
          { row: 7, col: 7 },

          { row: 1, col: 7 },
          { row: 2, col: 6 },
          { row: 3, col: 5 },
          { row: 5, col: 3 },
          { row: 6, col: 2 },
          { row: 7, col: 1 },

          { row: 1, col: 4 },
          { row: 2, col: 4 },
          { row: 3, col: 4 },
          { row: 5, col: 4 },

          { row: 4, col: 2 },
          { row: 4, col: 3 },
          { row: 4, col: 5 },
          { row: 4, col: 6 },
          { row: 4, col: 7 },
        ].sort(sortPositionFunc)
      );
    });
  });
});
