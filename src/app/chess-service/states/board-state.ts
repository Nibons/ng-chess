import { CreateBoard, DeleteBoard } from '@chess/board.actions';
import { State, StateContext, Selector, Store } from '@ngxs/store';
import { BoardStateModelList, BoardStateModel } from '@chess/iboard.model';
import { Action } from '@ngxs/store';
import { GameState } from '@chess/game-state';

@State<BoardStateModelList>({
  name: 'boards',
  defaults: { boards: [] }
})
export class BoardState {
  @Selector() static getBoardById(Id: number, { getState }: StateContext<BoardStateModelList>) {
    return getState().boards.filter((b: BoardStateModel) => b.Id === Id);
  }
  @Selector() static BoardList(state: BoardStateModelList) {
    return state.boards;
  }
  @Action(CreateBoard)
  CreateBoard({ getState, patchState }: StateContext<BoardStateModelList>, { payload }: CreateBoard, store: Store) {
    payload.Id = store.selectSnapshot(GameState.GetIdCounter);
    patchState({
      boards: [...getState().boards, payload]
    });
  }


  @Action(DeleteBoard)
  DeleteBoard({ getState, patchState }: StateContext<BoardStateModelList>, { payload }: DeleteBoard) {
    patchState({
      boards: getState().boards.filter((b: BoardStateModel) => b.Id !== payload)
    });
  }

  constructor() { }
}
