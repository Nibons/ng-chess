import { GameStateModel } from '@chess//GameState.model';
import { Guid } from '@chess/guid';
import { TemplateStateModel } from '@chess/ITemplateState.model';

export class NewGame {
  static readonly type = '[Game] CreateGame';
  private Id: Guid;
  public get gameInfo(): GameStateModel {
    return {
      name: this.template.name,
      Id: this.Id,
      options: this.template.configStateTemplates.options,
      boards: null,
      template: this.template
    };
  }
  constructor(private template: TemplateStateModel) {
    this.Id = Guid.newGuid();
  }
}
