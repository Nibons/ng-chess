import { PlayerStateModel } from './iplayer.model';
import { BoardStateModel } from '@chess/iboard.model';
import { OptionsStateModel } from '@chess/options.model';
import { PieceStateModelList } from '@chess/ipiece.model';
export interface IGameTemplateList {
  templates: IGameTemplate[];
}

export interface StateTemplate {
  boards: BoardStateModel[];
  options: OptionsStateModel;
  pieces: PieceStateModelList;
  players: PlayerStateModel[];
}

export interface IGameTemplate {
  name: string;
  type: string;
  rootFolder?: string;
  configFiles?: {
    boards: string;
    options: string;
    pieces: string;
    players: string
  };
  configStateTemplates?: StateTemplate;
}
