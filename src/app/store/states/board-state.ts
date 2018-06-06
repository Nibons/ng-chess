import { CreateBoard } from '@chess/board.actions';
import { State, StateContext } from '@ngxs/store';
import { BoardStateModel } from '@chess/iboard.model';
import { Guid } from '@chess/guid';
import { Action } from '@ngxs/store';

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
  @Action(CreateBoard)
  CreateBoard(context: StateContext<BoardStateModel>, action: CreateBoard) {

  }
}
