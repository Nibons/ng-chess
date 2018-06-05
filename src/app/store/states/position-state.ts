import { Guid } from './../../chess-service/classes/guid';
import { PositionStateModel } from './../../chess-service/interfaces/iposition.model';
import { State } from '@ngxs/store';
@State<PositionStateModel>({
  name: 'positions',
  defaults: {
    Id: Guid.newGuid(),
    boardId: null,
    pieceId: null,
    gameId: null,
    coordinates: { dimensions: [0, 0] }
  }
})
export class PositionState {
}
