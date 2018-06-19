import { CreateAllPositions } from '@chess/CreateAllPositions';
import { BoardStateModel } from '@chess/iboard.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  constructor(board: BoardStateModel, store: Store) {
    this.payload = {
      gameId: board.gameId,
      Id: board.Id,
      direction: board.direction,
      range: board.range
    };
    store.dispatch(new CreateAllPositions(board.range, board.Id, board.gameId));
  }
}
