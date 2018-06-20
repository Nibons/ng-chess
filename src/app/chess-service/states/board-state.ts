import { Guid } from '@chess/guid';
import { DeleteBoard } from '@chess/DeleteBoard';
import { CreateBoard } from '@chess/CreateBoard';
import { State, StateContext, Selector, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { BoardStateModelList, BoardStateModel } from '@chess/iboard.model';
import { Action } from '@ngxs/store';
import { GameState } from '@chess/game-state';
import { GameStateModel } from '@chess/GameState.model';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';


@State<BoardStateModelList>({
  name: 'boards',
  defaults: { boards: [] }
})
export class BoardState {
  @Selector() static getBoardById(Id: Guid, { getState }: StateContext<BoardStateModelList>) {
    return getState().boards.filter((b: BoardStateModel) => b.Id === Id);
  }
  @Selector() static BoardList(state: BoardStateModelList) {
    return state.boards;
  }
  @Selector([PositionState]) static Positions(boardId: Guid, state: PositionStateModelList) {
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

  @Action(AddPositionToBoard)
  addPositionToBoard({ getState, patchState }: StateContext<BoardStateModelList>, { positionId, boardId }: AddPositionToBoard) {
    const boardToUpdate = getState().boards.find(b => b.Id === boardId);
    boardToUpdate.positions = [...boardToUpdate.positions, positionId];
    patchState({
      boards: [
        ...getState().boards.filter((b: BoardStateModel) => b.Id !== boardId),
        boardToUpdate
      ]
    });
  }
}
