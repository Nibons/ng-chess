import { RetrieveTemplateList } from '@chess/RetrieveTemplateList';
import { State, Selector, Action } from '@ngxs/store';
import { StateContext } from '@ngxs/store';
import { AddTemplate } from '@chess/AddTemplate';
import { TemplateStateModel } from '@chess/ITemplateState.model';

@State<TemplateStateModel[]>({
  name: 'gameSelect',
  defaults: []
})
export class TemplateState {
  constructor() { }

  @Action(RetrieveTemplateList)
  retrieveGameList(action: RetrieveTemplateList) { }

  @Action(AddTemplate)
  addTemplate({ getState, patchState }: StateContext<TemplateStateModel[]>, { payload }: AddTemplate) {
    patchState([
      ...getState(),
      payload
    ]);
  }

  @Selector()
  static TemplateList(state: TemplateStateModel[]) {
    return state;
  }
}
