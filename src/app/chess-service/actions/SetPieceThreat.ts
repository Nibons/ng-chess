import { PieceStateModel } from '@chess/ipiece.model';
export class SetPieceThreat {
  static readonly type = '[Piece] SetPieceThreat';
  constructor(public piece: PieceStateModel) { }
}
