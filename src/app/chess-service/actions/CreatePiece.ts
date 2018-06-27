import { BoardStateModelList } from './../interfaces/iboard.model';
import { SetPiece } from '@chess/SetPiece';
import { BoardState } from '@chess/board-state';
import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';

export class CreatePiece {
  static readonly type = '[Piece] CreatePiece';
  constructor(public piece: PieceStateModel, boardId: Guid, public gameId: Guid, public gameInfo, store: Store) {
    const defaults: Partial<PieceStateModel> = {
      gameId: gameId,
      Id: Guid.newGuid(),
      HasMoved: false,
      IsVital: false,
      boardNumber: 0
    };
    const newPiece = { ...defaults, ...piece };
    store.dispatch(new SetPiece(newPiece, boardId));
  }
}
