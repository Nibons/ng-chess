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
import { AllPositionsOnBoardCreated } from '@chess/AllPositionsCreatedOnBoard';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';


@State<BoardStateModelList>({
  name: 'boards',
  defaults: { boards: [] }
})
export class BoardState {
  constructor(actions$: Actions, store: Store) {
    actions$.pipe(
      ofActionSuccessful(CreateAllBoards)
    ).subscribe(
      ({ gameInfo }: CreateAllBoards) => {
        gameInfo.template.configStateTemplates.boards.forEach(
          boardStateModel => store.dispatch(new CreateBoard(boardStateModel, gameInfo.Id, gameInfo, store))
        );
      }
    );
    // when the board+PositionCreation is complete
    actions$.pipe(
      ofActionSuccessful(AddPositionToBoard),
      debounce(() => timer(10))
    ).subscribe(
      ({ boardId, gameInfo }: AddPositionToBoard) => {
        const totalPositionCount = store.selectSnapshot(BoardState.BoardList).find(b => b.Id.IsEqual(boardId)).totalPositionCount;
        const positionCount = store.selectSnapshot(PositionState.PositionList).filter(p => p.boardId.IsEqual(boardId)).length;
        if (positionCount === totalPositionCount) {
          store.dispatch(new AllPositionsOnBoardCreated(gameInfo, boardId));
        }
      }
    );
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
