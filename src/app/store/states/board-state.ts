import { CreateBoard, DeleteBoard } from '@chess/board.actions';
import { State, StateContext, Selector } from '@ngxs/store';
import { BoardStateModelList, BoardStateModel } from '@chess/iboard.model';
import { Guid } from '@chess/guid';
import { Action } from '@ngxs/store';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';
import { patch } from 'webdriver-js-extender';

@State<BoardStateModelList>({
  name: 'boards',
  defaults: { boards: [] }
})
export class BoardState {
  @Selector() static getBoardById(Id: number, { getState }: StateContext<BoardStateModelList>) {
    return getState().boards.filter((b: BoardStateModel) => b.Id === Id);
  }
  @Action(CreateBoard)
  CreateBoard({ getState, patchState }: StateContext<BoardStateModelList>, { payload }: CreateBoard) {
    const state = getState();
    patchState({
      boards: [...state.boards, payload]
    });
  }


  @Action(DeleteBoard)
  DeleteBoard({ getState, patchState }: StateContext<BoardStateModelList>, { payload }: DeleteBoard) {
    patchState({
      boards: getState().boards.filter((b: BoardStateModel) => b.Id !== payload)
    });
  }
}
