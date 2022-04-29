import { sortPositionFunc } from "../types/piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { King } from "./king";

const testcases = [
  {
    description: "success to move",
    axis: { x: 0, y: 1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 1, y: 1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 1, y: 0 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 1, y: -1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 0, y: -1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -1, y: -1 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -1, y: 0 },
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: -1, y: 1 },
    expected: true,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 2 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 2, y: 2 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 2, y: 0 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 2, y: -2 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: -2 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: -2, y: -2 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: -2, y: 0 },
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: -2, y: 1 },
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
  [null, null, null, null, new King({ color: PLAYER_COLOR.BLACK }), new King({ color: PLAYER_COLOR.WHITE }), null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

describe("King", () => {
  describe("validate method", () => {
    testcases.forEach((testcase) => {
      it(`${testcase.description} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new King({ color: PLAYER_COLOR.WHITE });
        expect(piece.validate(testcase.axis, false)).toBe(testcase.expected);
      });
    });
  });
  describe("listMoves method", () => {
    it(`should return proper moves`, async () => {
      const piece = new King({ color: PLAYER_COLOR.WHITE });
      expect(piece.listMoves({ curPosition: { row: 4, col: 4 }, cells }).sort(sortPositionFunc)).toStrictEqual(
        [
          { row: 3, col: 4 },
          // { row: 3, col: 5 },
          { row: 4, col: 5 },
          { row: 5, col: 5 },
          { row: 5, col: 4 },
          { row: 5, col: 3 },
          { row: 4, col: 3 },
          { row: 3, col: 3 },
        ].sort(sortPositionFunc)
      );
    });
  });
});
