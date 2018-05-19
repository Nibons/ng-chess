import { IPiece } from "../interfaces/ipiece";
import { EPieceType } from "../enums/e-piece-type.enum";

const xMax = 8
const yMax = 8

export class Board {
  activePieces: IPiece[]

  constructor(xMax)

  getPieceAt(position: Position): IPiece[] {
    return this.activePieces.filter(
      (piece: IPiece) => piece.position.IsSamePosition(position);
    )
    // return this.activePieces;
    // (
    //   (piece: IPiece) => piece.position.IsSamePosition(position)
    // );
  }
}
