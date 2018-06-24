import { PieceStateModel } from '@chess/ipiece.model';
export class SetPieceThreat {
  static readonly type = '[Piece] SetPieceThreat';
  public piece: PieceStateModel;
  constructor(piece: PieceStateModel) { }
}
