import { ICoordinates, IBoardDimensions } from '@chess/icoordinates.model';
import { IPosition } from '@chess/iposition.model';
import { Observable } from 'rxjs';
import { IPiece } from '@chess/ipiece.model';
import { IGameItem } from '@chess/igame-item.model';
import { Guid } from '@chess/guid';

export interface IBoard extends IGameItem {
  currentTurnPlayerNumber: number;
  direction: Coordinates;
  range: IBoardDimensions;
  playerColors: string[];
  positionList: Guid[];
  activePieceList: Guid[];
  GetPositionAt(coordinates: ICoordinates): IPosition;
  AddPiece(piece: IPiece): void; // Piece has coordinates in it already!
  AddPosition(position: IPosition): void; // This adds the position to the board, based on coordinates
}
