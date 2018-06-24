import { PieceStateModel } from '@chess/ipiece.model';
export class SetPiecePotentialMoves {
  static readonly type = '[Piece] SetPiecePotentialMoves';
  public piece: PieceStateModel;
  constructor(piece: PieceStateModel) {

  }
}
