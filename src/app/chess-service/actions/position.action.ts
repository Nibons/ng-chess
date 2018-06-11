import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';

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

export class SetPieceAt {
  static readonly type = '[Position] SetPieceAt';
  constructor(public pieceId: number, public coordinates: ICoordinates, public boardId: number, public gameId: Guid) { }
}
