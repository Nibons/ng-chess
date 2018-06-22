import { CreateAllPositions } from '@chess/CreateAllPositions';
import { BoardStateModel } from '@chess/iboard.model';
import { Store } from '@ngxs/store';
import { Guid } from '@chess/guid';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  constructor(board: BoardStateModel, gameId: Guid, store: Store) {
    this.payload = {
      gameId: gameId,
      Id: Guid.newGuid(),
      direction: board.direction,
      range: board.range
    };
    store.dispatch(
      new CreateAllPositions(this.payload.range, this.payload.Id, gameId, store));
  }
}
