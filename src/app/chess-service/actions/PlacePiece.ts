import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';
export class PlacePiece {
  static readonly type = '[Position] SetPieceAtPosition';
  constructor(public pieceId: Guid, public coordinates: ICoordinates, public boardId: Guid) { }
}
