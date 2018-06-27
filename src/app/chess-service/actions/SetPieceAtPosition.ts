import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';
import { PieceStateModel } from '@chess/ipiece.model';
export class SetPieceAtPosition {
  static readonly type = '[Position] SetPieceAtPosition';
  constructor(
    public piece: PieceStateModel,
    public coordinates: ICoordinates,
    public boardId: Guid,
    public gameId: Guid = piece.gameId) { }
}
