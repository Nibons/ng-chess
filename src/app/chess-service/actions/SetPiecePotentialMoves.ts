import { PieceStateModel } from '@chess/ipiece.model';
export class SetPiecePotentialMoves {
  static readonly type = '[Piece] SetPiecePotentialMoves]';
  constructor(public piece: PieceStateModel) { }
}
