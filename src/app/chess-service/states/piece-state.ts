import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Guid } from '@chess/guid';
import { SetPiece, SetPieceProperty } from '@chess/piece.actions';

@State<PieceStateModelList>({
  name: 'pieces',
  defaults: { pieces: [] }
})
export class PieceState {
  @Selector() static PieceList(state: PieceStateModelList) {
    return state.pieces;
  }
  @Selector() static getPieceById(state: PieceStateModelList) {
    return (Id: number) => {
      return state.pieces.find((piece: PieceStateModel) => piece.Id === Id);
    };
  }

  @Action(SetPiece)
  setPiece({ getState, patchState }: StateContext<PieceStateModelList>, action: SetPiece) {
    patchState({
      pieces: [
        ...getState().pieces.filter(p => p.Id !== action.payload.Id),
        action.payload
      ]
    });
  }

  @Action(SetPieceProperty)
  setPieceProperty({ getState, patchState }: StateContext<PieceStateModelList>, action: SetPieceProperty) {
    if (action.payload.Id === undefined) {
      throw new Error('Id Required on Partial<PieceStateModel>');
    } else {
      const currentPiece = getState().pieces.find(p => p.Id === action.payload.Id);
      const mergedPiece = (currentPiece.Id === action.payload.Id) ?
        { ...currentPiece, ...action.payload } : // this does the actual merging
        action.payload;
      patchState({
        pieces: [
          ...getState().pieces.filter(p => p.Id !== mergedPiece.Id),
          mergedPiece
        ]
      });
    }
  }

}
