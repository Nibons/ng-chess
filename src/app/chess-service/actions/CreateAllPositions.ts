import { Guid } from '@chess/guid';
import { PositionStateModel } from '@chess/iposition.model';
import { IBoardDimensions, ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';
import { CreatePosition } from '@chess/CreatePosition';
import { forkJoin } from 'rxjs';

export class CreateAllPositions {
  static readonly type = '[Positions] CreateAllPositions';
  public payload: PositionStateModel[] = [];
  public positionCreation$;
  constructor(range: IBoardDimensions, private boardId: Guid, private gameId: Guid, private store: Store) {
    const positionCreationList = [];
    for (let x = range.min.dimensions[0]; x <= range.max.dimensions[0]; x++) {
      for (let y = range.min.dimensions[1]; y <= range.max.dimensions[1]; y++) {
        if (range.min.dimensions.length === 3) {
          for (let z = range.min.dimensions[2]; z <= range.max.dimensions[2]; z++) {
            positionCreationList.push(this.createPosition({ dimensions: [x, y, z] }));
          }
        } else {
          positionCreationList.push(this.createPosition({ dimensions: [x, y] }));
        }
      }
    }
    this.positionCreation$ = forkJoin(...positionCreationList);
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
    return this.store.dispatch(new CreatePosition(position));
  }
}
