import { PieceStateModel } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
export class SetPiece {
  static readonly type = '[Piece] SetPiece';
  constructor(public piece: PieceStateModel, public boardId?: Guid) { }
}
