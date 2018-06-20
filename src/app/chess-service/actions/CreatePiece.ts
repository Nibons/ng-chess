import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';
export class CreatePiece {
  static readonly type = '[Piece] CreatePiece';
  constructor(public piece: PieceStateModel, public gameId: Guid) { }
}
