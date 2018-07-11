import { IdAndStateTemplate } from './../interfaces/GameState.model';
import { BoardStateModelList } from './../interfaces/iboard.model';
import { SetPiece } from '@chess/SetPiece';
import { BoardState } from '@chess/board-state';
import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';

export class CreatePiece {
  static readonly type = '[Piece] CreatePiece';
  constructor(public piece: PieceStateModel, boardId: Guid, public gameId: Guid, public gameInfo: IdAndStateTemplate, store: Store) {
    const pieceUniqueInfo: Partial<PieceStateModel> = {
      gameId: gameId,
      Id: Guid.newGuid()
    };
    const defaults: Partial<PieceStateModel> = gameInfo.gameTemplate.pieces.pieceDefaults;
    const newPiece = { ...defaults, ...pieceUniqueInfo, ...piece };
    store.dispatch(new SetPiece(newPiece, boardId));
  }
}
