import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SetPiece } from '@chess/SetPiece';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { PositionStateModel } from '@chess/iposition.model';
import { TemplateState } from '@chess/game-select-state';
import { Guid } from '@chess/guid';
import { CreatePiece } from '@chess/CreatePiece';

@State<PieceStateModel[]>({
  name: 'pieces',
  defaults: []
})
export class PieceState {
  constructor(private actions$: Actions, store: Store) {
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
  setPiece({ getState, patchState }: StateContext<PieceStateModelList>, action: SetPiece) {
    if (getState().pieces) {
    patchState({
      pieces: [
          action.payload,
          ...getState().pieces,
        ]
      });
    } else {
      patchState({
        pieces: [
        action.payload
      ]
    });
  }
  }
  @Action(CreatePiece)
  createPiece({ getState, patchState }: StateContext<PieceStateModelList>, { piece }: CreatePiece) {
    if (piece.Id === null) { piece.Id = Guid.newGuid(); }
    this.store.dispatch(new SetPiece(piece));
  }
  @Action(SetPieceThreat)
  setPieceThreat({ getState, patchState }: StateContext<PieceStateModelList>, { piece }: SetPieceThreat) {
    const currentPieceState = getState().pieces.find(p => p.Id === piece.Id);
    if (currentPieceState.threatList !== piece.threatList) {
      patchState({
        pieces: [
          ...getState().pieces.filter(p => p.Id !== piece.Id),
          piece
        ]
      });
    }
  }
  @Action(SetPiecePotentialMoves)
  setPiecePotentialMoves({ getState, patchState }: StateContext<PieceStateModelList>, { piece }: SetPieceThreat) {
    const currentPieceState = getState().pieces.find(p => p.Id === piece.Id);
    if (currentPieceState.potentialMoves !== piece.potentialMoves) {
      patchState({
        pieces: [
          ...getState().pieces.filter(p => p.Id !== piece.Id),
          piece
        ]
      });
    }
  }
}
