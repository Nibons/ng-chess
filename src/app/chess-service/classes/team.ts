import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece';
import { Board } from '@chess/board';

export class Player {
  livingPieces: IPiece[];
  deadPieces: IPiece[];
  IsInCheck = false;
  IsCurrentTurn = false;

  constructor(color: EPieceType) { }
}
