import { PlayerStateModelList } from './iplayer.model';
import { BoardStateModelList } from '@chess/iboard.model';
import { OptionsStateModel } from '@chess/options.model';
import { PieceStateModelList } from '@chess/ipiece.model';
export interface IGameTemplateList {
  templates: IGameTemplate[];
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
  configStateTemplates?: {
    boards: BoardStateModelList
    options: OptionsStateModel
    pieces: PieceStateModelList
    players: PlayerStateModelList
  };
}
