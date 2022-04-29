import { sortPositionFunc } from "../types/piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { Bishop } from "./bishop";

const testcases = [
  {
    description: "success to move",
    axis: { x: 1, y: 1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 1, y: -1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -1, y: 1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -1, y: -1 },
    expected: true,
  },
  {
    description: "fail to move",
    axis: { x: 1, y: 2 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 1 },
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
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

describe("Bishop", () => {
  describe("validate method", () => {
    testcases.forEach((testcase) => {
      it(`${testcase.description} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new Bishop({ color: PLAYER_COLOR.WHITE });
        expect(piece.validate(testcase.axis, false)).toBe(testcase.expected);
      });
    });
  });
  describe("listMoves method", () => {
    it(`should return proper moves`, async () => {
      const piece = new Bishop({ color: PLAYER_COLOR.WHITE });
      expect(piece.listMoves({ curPosition: { row: 4, col: 4 }, cells }).sort(sortPositionFunc)).toStrictEqual(
        [
          { row: 7, col: 1 },
          { row: 6, col: 2 },
          { row: 5, col: 3 },
          { row: 3, col: 5 },
          { row: 2, col: 6 },
          { row: 1, col: 7 },

          { row: 0, col: 0 },
          { row: 1, col: 1 },
          { row: 2, col: 2 },
          { row: 3, col: 3 },
          { row: 5, col: 5 },
          { row: 6, col: 6 },
          { row: 7, col: 7 },
        ].sort(sortPositionFunc)
      );
    });
  });
});
