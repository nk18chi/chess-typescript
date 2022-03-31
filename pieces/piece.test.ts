import { PLAYER_COLOR } from "../playerColor";
import { Piece } from "./piece";

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
      expect(piece["isMoved"]).toBe(false);
      piece.moved();
      expect(piece["isMoved"]).toBe(true);
    });
  });
  describe("validate", () => {
    it(`should avoid staying at the same position as a move`, async () => {
      const piece = new Piece({ color: PLAYER_COLOR.WHITE });
      expect(piece.validate({ x: 0, y: 0 }, false)).toBe(false);
      expect(piece.validate({ x: 1, y: 0 }, false)).toBe(true);
    });
  });
});
