import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector } from '@ngxs/store';
import { Guid } from '@chess/guid';

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
}
