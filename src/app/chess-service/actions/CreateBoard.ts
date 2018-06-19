import { CreateAllPositions } from '@chess/CreateAllPositions';
import { BoardStateModel } from '@chess/iboard.model';
import { Store } from '@ngxs/store';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  constructor({ gameId, direction, range, Id }: BoardStateModel, store: Store) {
    this.payload = {
      gameId: gameId,
      Id: Id,
      direction: direction,
      range: range
    };
    store.dispatch(new CreateAllPositions(this.payload, gameId));
  }
}
