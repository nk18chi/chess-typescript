import { Board } from "../board";
import { MAP_SIZE } from "../constant";
import { sortPositionFunc } from "../types/piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { King } from "./king";
import { Rook } from "./rook";

const testcasesForMoves = [
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

const testcasesForSpecialMoves = [
  {
    description: "casling: should succede to do special move",
    turn: PLAYER_COLOR.WHITE,
    axis: { x: 2, y: 0 },
    from: { row: 7, col: 4 },
    to: { row: 7, col: 6 },
    promotion: null,
    expected: true,
  },
  {
    description: "casling: should succede to do special move",
    turn: PLAYER_COLOR.WHITE,
    axis: { x: -2, y: 0 },
    from: { row: 7, col: 4 },
    to: { row: 7, col: 2 },
    promotion: null,
    expected: true,
  },
  {
    description: "casling: should succede to do special move",
    turn: PLAYER_COLOR.BLACK,
    axis: { x: 2, y: 0 },
    from: { row: 0, col: 4 },
    to: { row: 0, col: 6 },
    promotion: null,
    expected: true,
  },
  {
    description: "casling: should succede to do special move",
    turn: PLAYER_COLOR.BLACK,
    axis: { x: -2, y: 0 },
    from: { row: 0, col: 4 },
    to: { row: 0, col: 2 },
    promotion: null,
    expected: true,
  },
];

describe("King", () => {
  const board = new Board(MAP_SIZE);
  beforeEach(() => {
    board.cells = Array.from(Array(MAP_SIZE), () => new Array(MAP_SIZE).fill(null));
  });
  describe("validate method", () => {
    testcasesForMoves.forEach((testcase) => {
      it(`${testcase.description} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new King({ color: PLAYER_COLOR.WHITE });
        expect(piece.validate(testcase.axis, false)).toBe(testcase.expected);
      });
    });
  });
  describe("listMoves method", () => {
    it(`should return proper moves`, async () => {
      const piece = new King({ color: PLAYER_COLOR.WHITE });
      board.cells[3][4] = new King({ color: PLAYER_COLOR.BLACK });
      board.cells[3][5] = new King({ color: PLAYER_COLOR.WHITE });
      expect(piece.listMoves({ curPosition: { row: 4, col: 4 }, cells: board.cells }).sort(sortPositionFunc)).toStrictEqual(
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
  describe("specialMove method", () => {
    testcasesForSpecialMoves.forEach((testcase) => {
      it(`${testcase.description} ${PLAYER_COLOR[testcase.turn]} ${JSON.stringify(testcase.axis)}`, async () => {
        const piece = new King({ color: testcase.turn });
        board.cells[testcase.from.row][testcase.from.col] = piece;
        board.cells[testcase.from.row][testcase.axis.x < 0 ? 0 : 7] = new Rook({ color: testcase.turn });
        expect(
          piece.specialMove({
            turn: testcase.turn,
            axis: testcase.axis,
            from: testcase.from,
            to: testcase.to,
            board,
            promotion: testcase.promotion,
          })
        ).toBe(testcase.expected);
        if (testcase.expected) expect(board.cells[testcase.from.row][testcase.axis.x < 0 ? 3 : 5]).toStrictEqual(new Rook({ color: testcase.turn }));
      });
    });
    it(`casling: should not do special move if king has been moved`, async () => {
      const piece = new King({ color: PLAYER_COLOR.WHITE });
      piece.lastMovedTurn = 1;
      board.cells[7][4] = piece;
      expect(
        piece.specialMove({
          turn: PLAYER_COLOR.WHITE,
          axis: { x: 2, y: 0 },
          from: { row: 7, col: 4 },
          to: { row: 7, col: 6 },
          board,
          promotion: null,
        })
      ).toBe(false);
    });
    it(`casling: should not do special move if rook has been moved`, async () => {
      const piece = new King({ color: PLAYER_COLOR.WHITE });
      const rook = new Rook({ color: PLAYER_COLOR.WHITE });
      board.cells[7][4] = piece;
      board.cells[7][7] = rook;
      rook.lastMovedTurn = 1;
      expect(
        piece.specialMove({
          turn: PLAYER_COLOR.WHITE,
          axis: { x: 2, y: 0 },
          from: { row: 7, col: 4 },
          to: { row: 7, col: 6 },
          board,
          promotion: null,
        })
      ).toBe(false);
    });
    it(`casling: should not do special move if there is a piece between king and rook`, async () => {
      const piece = new King({ color: PLAYER_COLOR.WHITE });
      board.cells[7][4] = piece;
      board.cells[7][6] = new Rook({ color: PLAYER_COLOR.WHITE });
      board.cells[7][7] = new Rook({ color: PLAYER_COLOR.WHITE });
      expect(
        piece.specialMove({
          turn: PLAYER_COLOR.WHITE,
          axis: { x: 2, y: 0 },
          from: { row: 7, col: 4 },
          to: { row: 7, col: 6 },
          board,
          promotion: null,
        })
      ).toBe(false);
    });
    it(`casling: should not do special move if king get attacked`, async () => {
      const piece = new King({ color: PLAYER_COLOR.WHITE });
      board.cells[7][4] = piece;
      board.cells[7][7] = new Rook({ color: PLAYER_COLOR.WHITE });
      board.cells[0][4] = new Rook({ color: PLAYER_COLOR.BLACK });
      expect(
        piece.specialMove({
          turn: PLAYER_COLOR.WHITE,
          axis: { x: 2, y: 0 },
          from: { row: 7, col: 4 },
          to: { row: 7, col: 6 },
          board,
          promotion: null,
        })
      ).toBe(false);
    });
    it(`casling: should not do special move if the path that king go through get attacked`, async () => {
      const piece = new King({ color: PLAYER_COLOR.WHITE });
      board.cells[7][4] = piece;
      board.cells[7][7] = new Rook({ color: PLAYER_COLOR.WHITE });
      board.cells[0][6] = new Rook({ color: PLAYER_COLOR.BLACK });
      expect(
        piece.specialMove({
          turn: PLAYER_COLOR.WHITE,
          axis: { x: 2, y: 0 },
          from: { row: 7, col: 4 },
          to: { row: 7, col: 6 },
          board,
          promotion: null,
        })
      ).toBe(false);
    });
  });
});
