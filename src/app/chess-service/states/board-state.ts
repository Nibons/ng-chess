import { PieceState } from '@chess/piece-state';
import { BoardStateModel } from '@chess/iboard.model';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { Guid } from '@chess/guid';
import { PositionStateModel } from './../interfaces/iposition.model';
import { DeleteBoard } from '@chess/DeleteBoard';
import { CreateBoard } from '@chess/CreateBoard';
import { State, StateContext, Selector, Store, Actions, ofActionSuccessful, Action } from '@ngxs/store';
import { PositionState } from '@chess/position-state';
import { CreateAllBoards } from '@chess/CreateAllBoards';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';
import { AllPositionsOnBoardCreated } from '@chess/AllPositionsOnBoardCreated';


@State<BoardStateModel[]>({
  name: 'boards',
  defaults: [],
  children: [PositionState, PieceState]
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
  @Selector() static getBoardById(Id: Guid, { getState }: StateContext<BoardStateModel[]>) {
    return getState().filter((b: BoardStateModel) => b.Id === Id);
  }
  @Selector() static BoardList(state: BoardStateModel[]) {
    return state;
  }
  @Selector([PositionState]) static Positions(boardId: Guid, state: PositionStateModel[]) {
    return state.filter((p: PositionStateModel) => p.boardId === boardId);
  }
  @Action(CreateBoard)
  CreateBoard({ getState, patchState }: StateContext<BoardStateModel[]>, { payload }: CreateBoard) {
    patchState([...getState(), payload]);
  }

  @Action(DeleteBoard)
  DeleteBoard({ getState, patchState }: StateContext<BoardStateModel[]>, { payload }: DeleteBoard) {
    patchState([
      ...getState().filter((b: BoardStateModel) => b.Id !== payload)
    ]);
  }
}
