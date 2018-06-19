import { BoardStateModel } from '@chess/iboard.model';
import { Guid } from '@chess/guid';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  constructor({ gameId, direction, range, Id }: BoardStateModel) {
    this.payload = {
      gameId: gameId,
      Id: Id,
      direction: direction,
      range: range
    };
  }
}
