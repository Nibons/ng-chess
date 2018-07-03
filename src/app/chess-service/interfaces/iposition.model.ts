import { PieceStateModel } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';
export interface PositionStateModel {
  Id: Guid;
  gameId: Guid;
  boardId: Guid;
  piece: PieceStateModel;
  coordinates: ICoordinates;
  watchList: Guid[];
}
