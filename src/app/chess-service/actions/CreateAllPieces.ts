import { Actions, Store } from '@ngxs/store';
import { Guid } from '@chess/guid';
import { CreatePiece } from '@chess/CreatePiece';

export class CreateAllPieces {
  static readonly type = '[Piece] CreateAllPieces';
  constructor(public pieces, public boardId: Guid, public gameId, public gameInfo, store: Store) {
    for (const piece of pieces) {
      store.dispatch(new CreatePiece(piece, boardId, gameId, gameInfo, store));
    }
  }
}
