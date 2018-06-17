import { BoardStateModel } from '@chess/iboard.model';
import { Guid } from '@chess/guid';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  constructor({ gameId, direction, range }: BoardStateModel) {
    this.payload = {
      gameId: gameId,
      Id: null,
      direction: direction,
      range: range
    };
  }
}
