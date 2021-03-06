import { sortPositionFunc } from "../types/piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { Knight } from "./knight";

const testcases = [
  {
    description: "success to move",
    axis: { x: 1, y: 2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 1, y: -2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -1, y: -2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -1, y: 2 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 2, y: 1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 2, y: -1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -2, y: -1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -2, y: 1 },
    expected: true,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 1 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 1, y: 1 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 1, y: 0 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: -1 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: -1, y: -1 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: -1, y: 0 },
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
  [null, null, null, null, null, new Knight({ color: PLAYER_COLOR.BLACK }), null, null],
  [null, null, null, null, null, null, new Knight({ color: PLAYER_COLOR.WHITE }), null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

describe("Knight", () => {
  describe("validate method", () => {
    testcases.forEach((testcase) => {
      it(`${testcase.description} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new Knight({ color: PLAYER_COLOR.WHITE });
        expect(piece.validate(testcase.axis, false)).toBe(testcase.expected);
      });
    });
  });
  describe("listMoves method", () => {
    it(`should return proper moves`, async () => {
      const piece = new Knight({ color: PLAYER_COLOR.WHITE });
      expect(piece.listMoves({ curPosition: { row: 4, col: 4 }, cells }).sort(sortPositionFunc)).toStrictEqual(
        [
          { row: 5, col: 6 },
          { row: 5, col: 2 },
          { row: 6, col: 5 },
          { row: 6, col: 3 },
          { row: 2, col: 5 },
          { row: 2, col: 3 },
          { row: 3, col: 2 },
          // { row: 3, col: 6 },
        ].sort(sortPositionFunc)
      );
    });
  });
});
