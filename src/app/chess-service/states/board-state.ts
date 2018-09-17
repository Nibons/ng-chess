import { AllPiecesOnBoardCreated } from '@chess/AllPiecesOnBoardCreated';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { Guid } from '@chess/guid';
import { PositionStateModel } from './../interfaces/iposition.model';
import { PositionStateModelList } from '@chess/iposition.model';
import { DeleteBoard } from '@chess/DeleteBoard';
import { CreateBoard } from '@chess/CreateBoard';
import { State, StateContext, Selector, Store, Actions, ofActionSuccessful, Action } from '@ngxs/store';
import { BoardStateModelList, BoardStateModel } from '@chess/iboard.model';
import { PositionState } from '@chess/position-state';
import { CreateAllBoards } from '@chess/CreateAllBoards';
import { debounce, map } from 'rxjs/operators';
import { AllPositionsOnBoardCreated } from '@chess/AllPositionsOnBoardCreated';
import { AddBoardToGame } from '@chess/AddBoardToGame';


@State<BoardStateModelList>({
  name: 'boards',
  defaults: { boards: [] }
})
export class BoardState {
  constructor(actions$: Actions, public store: Store) {
  }
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
  CreateBoard({ getState, patchState, dispatch }: StateContext<BoardStateModelList>, { payload }: CreateBoard) {
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
  addPositionToBoard({ getState, patchState }: StateContext<BoardStateModelList>, { position, boardId }: AddPositionToBoard) {
    const board: BoardStateModel = getState().boards.find(b => b.Id.IsEqual(boardId));
    board.positions.push(position);
    patchState({
      boards: [
        ...getState().boards.filter(b => !b.Id.IsEqual(boardId)),
        board
      ]
    });
  }
  @Action(CreateAllBoards)
  createAllBoards({ dispatch }: StateContext<BoardStateModelList>, action: CreateAllBoards) {
    action.gameIdAndTemplate.gameTemplate.boards.forEach(
      board => {
        dispatch(new CreateBoard(board, action.gameIdAndTemplate, this.store));
      }
    );
  }

  @Action(AllPositionsOnBoardCreated)
  AllPositionsOnBoardCreated({ getState, dispatch }: StateContext<BoardStateModelList>, { boardId, gameInfo }: AllPositionsOnBoardCreated) {
    const board = getState().boards.find(b => b.Id.IsEqual(boardId));
    dispatch(new AddBoardToGame(board, gameInfo));
  }

}
