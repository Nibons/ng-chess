import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';
export class CreatePiece {
  static readonly type = '[Piece] CreatePiece';
  public piece: PieceStateModel;
  constructor(inputpiece: PieceStateModel, public gameId: Guid, private store: Store) { }
}
