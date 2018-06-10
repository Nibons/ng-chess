import { GameStateModel } from '@chess/igame.model';
import { BoardStateModelList } from './iboard.model';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { PieceStateModelList } from './ipiece.model';
export interface GameModelList {
  gameList: GameModel[];
}
export interface GameModel {
  name: string;
  options: GameStateModel;
  boards: BoardStateModelList;
  pieces: PieceStateModelList;
  players: PlayerStateModelList;
}
