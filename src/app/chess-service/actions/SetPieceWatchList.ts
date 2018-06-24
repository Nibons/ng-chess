import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';

export class SetPieceWatchList {
  static readonly type = '[Piece] SetPieceWatchList';
  public positions: Guid[];
  public pieceId: Guid;
  constructor(piece: PieceStateModel) {

  }
}
