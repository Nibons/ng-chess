import { BoardStateModel } from './iboard.model';
import { IBoardDimensions } from '@chess/icoordinates.model';
import { PositionStateModel } from '@chess/iposition.model';
import { Guid } from '@chess/guid';


export interface BoardStateModel {
  gameId: Guid;
  Id: Guid;
  direction: Coordinates;
  range: IBoardDimensions;
  totalPositionCount: number;
  positions: PositionStateModel[];
}
