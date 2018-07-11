import { IdAndStateTemplate } from '@chess/GameState.model';
import { Guid } from '@chess/guid';

export class CreateAllPieces {
  static readonly type = '[Piece] CreateAllPieces';
  constructor(public boardId: Guid, public gameId, public gameInfo: IdAndStateTemplate) {
  }
}
