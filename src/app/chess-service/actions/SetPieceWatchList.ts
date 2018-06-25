import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';

export class SetPieceWatchList {
  static readonly type = '[Piece] SetPieceWatchList';
  
  constructor(public pieceId: Guid, public positions: Guid[]) {
    
  }
}
