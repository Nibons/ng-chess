import { OptionsStateModel } from '@chess/options.model';
import { State, Selector } from '@ngxs/store';

@State<OptionsStateModel[]>({
  name: 'optionSets'
})
export class OptionsState {
  @Selector() static getColors(state: OptionsStateModel) {
    return state.colorList;
  }
}
