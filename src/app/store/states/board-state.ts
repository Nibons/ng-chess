import { State } from '@ngxs/store';
import { BoardStateModel } from '@chess/iboard.model';
import { Guid } from '@chess/guid';

@State<BoardStateModel>({
  name: 'boards',
  defaults: {
    Id: Guid.newGuid(),
    gameId: null,
    currentTurnPlayerNumber: 0,
    direction: null,
    range: {
      min: { dimensions: [0, 0] },
      max: { dimensions: [7, 7] }
    },
    playerColors: [],
    positionList: [],
    activePieceList: []
  }
})
export class BoardState {
}
