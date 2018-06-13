import { PieceStateModel } from '@chess/ipiece.model';
import { CreateBoard, DeleteBoard } from '@chess/board.actions';
import { State, StateContext, Selector, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { BoardStateModelList, BoardStateModel } from '@chess/iboard.model';
import { Action } from '@ngxs/store';
import { GameState } from '@chess/game-state';
import { GameStateModel } from '@chess/GameState.model';
import { CreatePiece } from '@chess/piece.actions';

@State<BoardStateModelList>({
  name: 'boards',
  defaults: { boards: [] }
})
export class BoardState {
  constructor(private actions$: Actions, private store: Store) {
    // on game creation, create the board
    this.actions$.pipe(
      ofActionSuccessful(CreateBoard)
    ).subscribe(({ template }: GameStateModel) => {
      template.configStateTemplates.pieces.pieces.forEach(
        (p: PieceStateModel) => store.dispatch(new CreatePiece(...p, store))
      );
    });
  }
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
}
