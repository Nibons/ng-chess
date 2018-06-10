import { OptionsStateModel } from '@chess/igame.model';
import { BoardStateModelList } from './iboard.model';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { PieceStateModelList } from './ipiece.model';
export interface GameModelList {
  gameList: GameModel[];
}
export interface GameModel {
  name: string;
  options: OptionsStateModel;
  boards: BoardStateModelList;
  pieces: PieceStateModelList;
  players: PlayerStateModelList;
}

export interface IGameTemplate {
  name: string;
  type: string;
  rootFolder: string;
  configFiles: {
    boards: string;
    options: string;
    pieces: string;
    players: string
  };
}
