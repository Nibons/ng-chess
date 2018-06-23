import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { Guid } from '@chess/guid';
import { PositionStateModel } from './../interfaces/iposition.model';
import { PositionStateModelList } from '@chess/iposition.model';
import { DeleteBoard } from '@chess/DeleteBoard';
import { CreateBoard } from '@chess/CreateBoard';
import { State, StateContext, Selector, Store, Actions } from '@ngxs/store';
import { BoardStateModelList, BoardStateModel } from '@chess/iboard.model';
import { Action } from '@ngxs/store';
import { PositionState } from '@chess/position-state';


@State<BoardStateModelList>({
  name: 'boards',
  defaults: { boards: [] }
})
export class BoardState {
  constructor() { }
  @Selector() static getBoardById(Id: Guid, { getState }: StateContext<BoardStateModelList>) {
    return getState().boards.filter((b: BoardStateModel) => b.Id === Id);
  }
  @Selector() static BoardList(state: BoardStateModelList) {
    return state.boards;
  }
  @Selector([PositionState]) static Positions(boardId: Guid, state: PositionStateModelList) {
    return state.positions.filter((p: PositionStateModel) => p.boardId === boardId);
  }
  @Action(CreateBoard)
  CreateBoard({ getState, patchState }: StateContext<BoardStateModelList>, { payload }: CreateBoard) {
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
    const board: BoardStateModel = getState().boards.find(b => b.Id.IsEqual(boardId));
    board.positions.push(positionId); // = (typeof board.positions === undefined) ? [positionId] : [...board.positions, positionId];
    patchState({
      boards: [
        ...getState().boards.filter(b => !b.Id.IsEqual(boardId)),
        board
      ]
    });
  }
}
