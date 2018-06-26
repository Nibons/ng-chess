import { AllPositionsOnBoardCreated } from '@chess/AllPositionsCreatedOnBoard';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { debounce, last } from 'rxjs/operators';
import { timer } from 'rxjs';
import { AllPiecesCreatedOnBoard } from '@chess/AllPiecesCreated';
import { PieceStateModel } from '@chess/ipiece.model';
import { PieceState } from '@chess/piece-state';
import { CreatePiece } from '@chess/CreatePiece';
import { Guid } from '@chess/guid';

export class CreateAllPieces {
  static readonly type = '[Pieces] CreateAllPieces';
  public gameId: Guid;
  constructor(public pieces, public boardId: Guid, gameId, private gameInfo, private actions$: Actions, private store: Store) { }
}
