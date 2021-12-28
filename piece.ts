import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { SIGN } from "./sign";

export type TPiece = {
  color: PLAYER_COLOR;
};

interface IPiece {
  show(): void;
  move(from: TPosition, to: TPosition): void;
  evolve(): void;
}

export abstract class Piece implements IPiece {
  protected color: PLAYER_COLOR;
  constructor({ color }: TPiece) {
    this.color = color;
  }

  abstract show(): void;
  abstract validate(): void;
  abstract evolve(): void;
  move() {
    this.validate();
  }
}
