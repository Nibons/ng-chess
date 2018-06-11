import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';

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
