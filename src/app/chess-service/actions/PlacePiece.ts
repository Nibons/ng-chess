import { ICoordinates } from '@chess/icoordinates.model';
export class PlacePiece {
  static readonly type = '[Position] SetPieceAtPosition';
  constructor(public pieceId: number, public coordinates: ICoordinates, public boardId: number) { }
}
