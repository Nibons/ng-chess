import { SetPieceAtPosition } from '@chess/SetPieceAtPosition';
import { SetPiece } from '@chess/SetPiece';
import { BoardState } from '@chess/board-state';
import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';

export class CreatePiece {
  static readonly type = '[Piece] CreatePiece';
  constructor(public piece: PieceStateModel, public gameId: Guid, store: Store) {
    const defaults: Partial<PieceStateModel> = {
      gameId: gameId,
      Id: Guid.newGuid(),
      HasMoved: false,
      IsVital: false,
      boardNumber: 0
    };
    const newPiece = { ...defaults, ...piece };
    const boardId = store.selectSnapshot(BoardState.BoardList)
      .filter(b => b.gameId === newPiece.gameId)[newPiece.boardNumber]
      .Id;
    store.dispatch(new SetPiece(newPiece));
    store.dispatch(new SetPieceAtPosition(newPiece, newPiece.coordinates, boardId));
  }
}
