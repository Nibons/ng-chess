import { PositionStateModel } from '@chess/IPosition.model';
import { Guid } from '@chess/guid';
import { IBoardDimensions, ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';
import { CreatePosition } from '@chess/CreatePosition';

export class CreateAllPositions {
  static readonly type = '[Position] CreateAllPositions';
  public payload: PositionStateModel[] = [];
  constructor(range: IBoardDimensions, private boardId: Guid, private gameId: Guid, private store: Store) {
    for (let x = range.min.dimensions[0]; x <= range.max.dimensions[0]; x++) {
      for (let y = range.min.dimensions[1]; y <= range.max.dimensions[1]; y++) {
        if (range.min.dimensions.length === 3) {
          for (let z = range.min.dimensions[2]; z <= range.max.dimensions[2]; z++) {
            this.payload.push(this.createPosition({ dimensions: [x, y, z] }));
          }
        } else {
          this.payload.push(this.createPosition({ dimensions: [x, y] }));
        }
      }
    }
  }
  createPosition(coordinates: ICoordinates) {
    const position: PositionStateModel = {
      boardId: this.boardId,
      gameId: this.gameId,
      watchList: [],
      pieceId: null,
      coordinates: coordinates,
      Id: Guid.newGuid()
    };
    return position;
  }
}
