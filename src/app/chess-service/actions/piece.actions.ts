import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';

export class CreatePiece {
  static readonly type = '[Piece] CreatePiece';
  constructor(
    playerNumber: number,
    playerId: Guid,
    pieceType: EPieceType,
    positionId: Guid,
    Id = Guid.newGuid(),
    IsPrimary = false,
    HasMoved = false,
    IsAlive = true,
  ) { }
}

export class SetPiece {
  static readonly type = '[Piece] SetPiece';
  constructor(public payload: PieceStateModel) { }
}

export class SetPieceProperty {
  static readonly type = '[Piece] SetPieceProperty';
  constructor(public payload: Partial<PieceStateModel>) { }
}
