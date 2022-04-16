import { PLAYER_COLOR } from "../types/playerColor";
import { Bishop } from "./bishop";
import { Knight } from "./knight";
import { Pawn } from "./pawn";
import { PROMOTION_STRING } from "../types/piece";
import { Queen } from "./queen";
import { Rook } from "./rook";

const testcases = [
  {
    description: "success to move",
    axis: { x: 0, y: 2 },
    isEmeny: false,
    expected: true,
    currentTurn: 0,
  },
  {
    description: "success to move",
    axis: { x: 0, y: 1 },
    isEmeny: false,
    expected: true,
    currentTurn: 1,
  },
  {
    description: "success to move",
    axis: { x: 1, y: 1 },
    isEmeny: true,
    expected: true,
    currentTurn: 1,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 2 },
    isEmeny: true,
    expected: false,
    currentTurn: 0,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 2 },
    isEmeny: false,
    expected: false,
    currentTurn: 1,
  },
  {
    description: "fail to move",
    axis: { x: 0, y: 1 },
    isEmeny: true,
    expected: false,
    currentTurn: 0,
  },
  {
    description: "fail to move",
    axis: { x: 1, y: 1 },
    isEmeny: false,
    expected: false,
    currentTurn: 0,
  },
];

const defaultCells = Array.from(Array(8), () => new Array(8).fill(null));
const pieceTestCases = [
  { name: "Queen", class: Queen, promotionString: PROMOTION_STRING.QUEEN },
  { name: "Rook", class: Rook, promotionString: PROMOTION_STRING.ROOK },
  { name: "Bishop", class: Bishop, promotionString: PROMOTION_STRING.BISHOP },
  { name: "Knight", class: Knight, promotionString: PROMOTION_STRING.KNIGHT },
];
const promotionParams = {
  turn: PLAYER_COLOR.WHITE,
  axis: { x: 0, y: 1 },
  from: { row: 1, col: 0 },
  to: { row: 0, col: 0 },
  currentTurn: 10,
  promotion: null,
};

describe("Pawn", () => {
  describe("validate method", () => {
    testcases.forEach((testcase) => {
      it(`${testcase.description} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new Pawn({ color: PLAYER_COLOR.WHITE });
        piece.moved(testcase.axis, testcase.currentTurn);
        expect(piece.validate(testcase.axis, testcase.isEmeny)).toBe(testcase.expected);
      });
    });
  });
  describe("specialMove method", () => {
    describe("promotion", () => {
      pieceTestCases.forEach((testcase) => {
        it(`promote to a ${testcase.name}`, async () => {
          const piece = new Pawn({ color: PLAYER_COLOR.WHITE });
          const cells = defaultCells;
          cells[1][0] = piece;
          const params = {
            ...promotionParams,
            promotion: testcase.promotionString,
            cells: cells,
          };
          expect(piece.specialMove(params)).toBe(true);
          expect(cells[1][0]).toStrictEqual(new testcase.class({ color: PLAYER_COLOR.WHITE }));
        });
      });
      it(`fail to promote if a promotion string is not set`, async () => {
        const piece = new Pawn({ color: PLAYER_COLOR.WHITE });
        const cells = defaultCells;
        cells[1][0] = piece;
        const params = {
          ...promotionParams,
          promotion: null,
          cells: cells,
        };
        expect(() => piece.specialMove(params)).toThrow("the piece must promote");
      });
      it(`fail to promote if a pawn is located in the wrong place to promote`, async () => {
        const piece = new Pawn({ color: PLAYER_COLOR.WHITE });
        const cells = defaultCells;
        cells[2][0] = piece;
        const params = {
          ...promotionParams,
          promotion: PROMOTION_STRING.QUEEN,
          from: { row: 2, col: 0 },
          to: { row: 1, col: 0 },
          cells: cells,
        };
        expect(() => piece.specialMove(params)).toThrow("the piece cannot promote from the current place");
      });
    });
    describe("enPassant", () => {
      it(`success to enPassant`, async () => {
        const piece = new Pawn({ color: PLAYER_COLOR.WHITE });
        const opponent = new Pawn({ color: PLAYER_COLOR.BLACK });
        opponent.lastMovedTurn = promotionParams.currentTurn - 1;
        opponent["isTwoStepMoved"] = true;
        const cells = defaultCells;
        cells[3][0] = piece;
        cells[3][1] = opponent;
        const params = {
          ...promotionParams,
          axis: { x: 1, y: 1 },
          from: { row: 3, col: 0 },
          to: { row: 2, col: 1 },
          cells: cells,
        };
        expect(piece.specialMove(params)).toBe(true);
        expect(cells[3][1]).toBe(null);
      });
      it(`fail to enPassant if the lastMovedTurn of the taken pawn is not one right ahead the current turn`, async () => {
        const piece = new Pawn({ color: PLAYER_COLOR.WHITE });
        const opponent = new Pawn({ color: PLAYER_COLOR.BLACK });
        opponent.lastMovedTurn = promotionParams.currentTurn - 2;
        const cells = defaultCells;
        cells[3][0] = piece;
        cells[3][1] = opponent;
        const params = {
          ...promotionParams,
          axis: { x: 1, y: 1 },
          from: { row: 3, col: 0 },
          to: { row: 2, col: 1 },
          cells: cells,
        };
        expect(piece.specialMove(params)).toBe(false);
        expect(cells[3][1]).toBe(opponent);
      });
      it(`fail to enPassant if the taken pawn has not moved two steps as an initial move `, async () => {
        const piece = new Pawn({ color: PLAYER_COLOR.WHITE });
        const opponent = new Pawn({ color: PLAYER_COLOR.BLACK });
        opponent.lastMovedTurn = promotionParams.currentTurn - 1;
        const cells = defaultCells;
        cells[3][0] = piece;
        cells[3][1] = opponent;
        const params = {
          ...promotionParams,
          axis: { x: 1, y: 1 },
          from: { row: 3, col: 0 },
          to: { row: 2, col: 1 },
          cells: cells,
        };
        expect(piece.specialMove(params)).toBe(false);
        expect(cells[3][1]).toBe(opponent);
      });
    });
  });
});
