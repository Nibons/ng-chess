import { IGameTemplate } from '@chess/igame-template.model';

export class AddTemplate {
  public static readonly type = '[gameSelect] AddTemplate';
  constructor(public payload: IGameTemplate) { }
}
