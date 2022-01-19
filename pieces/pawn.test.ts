import { PLAYER_COLOR } from "../playerColor";
import { Pawn } from "./pawn";

const testcases = [
  {
    description: "success to move",
    axis: { x: 0, y: 2 },
    isEmeny: false,
    expected: true,
    isMoved: false,
  },
  {
    description: "success to move",
    axis: { x: 0, y: 1 },
    isEmeny: false,
    expected: true,
  },
  {
    description: "success to move",
    axis: { x: 1, y: 1 },
    isEmeny: true,
    expected: true,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 2 },
    isEmeny: true,
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 2 },
    isEmeny: false,
    expected: false,
    isMoved: true,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 1 },
    isEmeny: true,
    expected: false,
  },
  {
    description: "fail to move",
    axis: { x: 1, y: 1 },
    isEmeny: false,
    expected: false,
  },
];

describe("Pawn", () => {
  describe("validate method", () => {
    testcases.forEach((testcase) => {
      it(`${testcase.description} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new Pawn({ color: PLAYER_COLOR.WHITE });
        if (testcase.isMoved) piece.moved();
        expect(piece.validate(testcase.axis, testcase.isEmeny)).toBe(testcase.expected);
      });
    });
  });
});
