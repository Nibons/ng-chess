import { TemplateStateModel } from '@chess/ITemplateState.model';

export class AddTemplate {
  public static readonly type = '[gameSelect] AddTemplate';
  constructor(public payload: TemplateStateModel) { }
}
