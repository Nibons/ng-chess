import { BoardState } from '@chess/board-state';
import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';

export class CreatePiece {
  static readonly type = '[Piece] CreatePiece';
  public boardId: Guid;
  constructor(public piece: PieceStateModel, store: Store) {
    const boardNumber = piece.boardNumber ? piece.boardNumber : 0;
    this.boardId = store.selectSnapshot(BoardState.BoardList).filter(b => b.gameId === piece.gameId)[boardNumber].Id;
  }
}
