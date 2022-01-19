import { PLAYER_COLOR } from "../playerColor";
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

describe("King", () => {
  describe("validate method", () => {
    testcases.forEach((testcase) => {
      it(`${testcase.description} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new King({ color: PLAYER_COLOR.WHITE });
        expect(piece.validate(testcase.axis, false)).toBe(testcase.expected);
      });
    });
  });
});
