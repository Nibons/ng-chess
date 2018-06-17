import { PieceStateModel } from '@chess/ipiece.model';
export class SetPiece {
  static readonly type = '[Piece] SetPiece';
  constructor(public payload: PieceStateModel) { }
}
