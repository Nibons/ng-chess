import { BoardStateModel } from '@chess/iboard.model';
import { Store } from '@ngxs/store';
import { Guid } from '@chess/guid';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  public range;
  public boardId;

  constructor(board: BoardStateModel, public gameId: Guid, public store: Store) {
    this.range = board.range;
    this.boardId = Guid.newGuid();
    this.payload = {
      gameId: gameId,
      Id: this.boardId,
      direction: board.direction,
      range: board.range,
      positions: []
    };
  }
}
