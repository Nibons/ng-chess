import { RetrieveTemplateList } from '@chess/RetrieveTemplateList';
import { State, Selector, Action } from '@ngxs/store';
import { StateContext } from '@ngxs/store';
import { IGameTemplateList } from '@chess/igame-template.model';
import { AddTemplate } from '@chess/AddTemplate';

@State<IGameTemplateList>({
  name: 'gameSelect',
  defaults: {
    templates: []
  }
})
export class TemplateState {
  constructor() { }

  @Action(RetrieveTemplateList)
  retrieveGameList(action: RetrieveTemplateList) { }

  @Action(AddTemplate)
  addTemplate({ getState, patchState }: StateContext<IGameTemplateList>, { payload }: AddTemplate) {
    patchState({
      templates: [
        ...getState().templates,
        payload
      ]
    });
  }

  @Selector()
  static TemplateList(state: IGameTemplateList) {
    return state.templates;
  }


}
