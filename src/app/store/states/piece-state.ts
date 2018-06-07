import { PieceStateModelList } from '@chess/ipiece.model';
import { State } from '@ngxs/store';
import { Guid } from '@chess/guid';

@State<PieceStateModelList>({
  name: 'pieces',
  defaults: { pieces: [] }
})
export class PieceState {
}
