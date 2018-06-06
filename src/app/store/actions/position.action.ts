import { Guid } from './../../chess-service/classes/guid';
import { ICoordinates } from '@chess/icoordinates.model';
import { Coordinates } from '@chess/coordinates';
export class CreatePosition {
  static readonly type = '[Position] CreatePosition';
  constructor(
    Id: Guid = Guid.newGuid(),
    boardId: Guid,
    pieceId: Guid,
    gameId: Guid,
    coordinates: ICoordinates
  ) {

  }
}
