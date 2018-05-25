import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece';
import { Board } from '@chess/board';
import { ChessObject } from '@chess/chess-object';

export class Player extends ChessObject {
  livingPieces: IPiece[];
  deadPieces: IPiece[];
  IsInCheck = false;
  IsCurrentTurn = false;

  constructor(color: EPieceType) {
    super();
  }
}
