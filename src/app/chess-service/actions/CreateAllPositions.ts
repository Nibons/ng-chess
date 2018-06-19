import { Guid } from '@chess/guid';
import { BoardStateModel } from '@chess/iboard.model';
import { Coordinates } from '@chess/coordinates';
import { PositionStateModel } from '@chess/iposition.model';
import { IBoardDimensions } from '@chess/icoordinates.model';

export class CreateAllPositions {
  static readonly type = '[Positions] CreateAllPositions';
  public payload: PositionStateModel[] = [];
  constructor(range: IBoardDimensions, Id: number, gameId: Guid) {
    const decimalMax = Coordinates.getDecimalFromMaxCoordinates(range);
    const dimensionDigitValue = Coordinates.getBoardDimensionsDigitValue(range.max.dimensions, range.min.dimensions);
    const positions = [];
    for (let i = 0; i >= decimalMax; i++) {
      const positionInfo: PositionStateModel = {
        gameId: gameId,
        boardId: Id,
        Id: null,
        coordinates: Coordinates.getCoordinateFromDecimal(i, dimensionDigitValue, range.min),
        pieceId: null,
        watchList: []
      };
      positions.push(positionInfo);
    }
  }
}
