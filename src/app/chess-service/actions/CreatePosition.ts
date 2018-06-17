import { PositionStateModel } from '@chess/iposition.model';
import { Guid } from '@chess/guid';

export class CreatePosition {
  static readonly type = '[Positions] CreatePosition';
  public payload: PositionStateModel;
  constructor({ gameId, boardId, coordinates, Id }: PositionStateModel) {
    this.payload = {
      boardId: boardId,
      coordinates: coordinates,
      gameId: gameId,
      Id: Id,
      pieceId: null,
      watchList: []
    };
  }
}
