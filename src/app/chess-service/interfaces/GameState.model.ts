import { TemplateStateModel } from './ITemplateState.model';
import { BoardStateModel } from '@chess/iboard.model';
import { OptionsStateModel } from '@chess/options.model';
import { Guid } from '@chess/guid';

export interface GameStateModel {
  name: string;
  Id: Guid;
  options: OptionsStateModel;
  boards: BoardStateModel[];
  template: TemplateStateModel;
}


