import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SetPiece } from '@chess/SetPiece';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { Guid } from '@chess/guid';
import { CreatePiece } from '@chess/CreatePiece';

@State<PieceStateModel[]>({
  name: 'pieces',
  defaults: []
})
export class PieceState {
  constructor(private actions$: Actions, private store: Store) {
    // on game creation, create the board
    const pieceTemplateList = store.selectSnapshot(TemplateState.TemplateList);
    this.actions$.pipe(
      ofActionSuccessful(AddPositionToBoard)
    ).subscribe((position: PositionStateModel) => {

    });
  }
  @Selector() static PieceList(state: PieceStateModelList): PieceStateModel[] {
    return state.pieces;
  }
  @Selector() static getPieceById(state: PieceStateModelList) {
    return (Id: Guid) => {
      return state.pieces.find((piece: PieceStateModel) => piece.Id === Id);
    };
  }

  @Action(SetPiece)
  setPiece({ getState, patchState }: StateContext<PieceStateModelList>, { piece }: SetPiece) {
    if (getState().pieces) {
      patchState({
        pieces: [
          piece,
          ...getState().pieces,
        ]
      });
    } else {
      patchState({
        pieces: [
          piece
        ]
      });
    }
  }
  @Action(CreatePiece)
  createPiece(action: CreatePiece) { }
}
