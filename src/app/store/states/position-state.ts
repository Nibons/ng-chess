import { Guid } from '@chess/guid';
import { PositionStateModelList } from '@chess/iposition.model';
import { State } from '@ngxs/store';
@State<PositionStateModelList>({
  name: 'positions',
  defaults: { positions: [] }
})
export class PositionState {
}
