import { GameStateModel } from '@chess/igame.model';
import { BoardStateModelList } from './iboard.model';
import { PlayerStateModel, PlayerStateModelList } from '@chess/iplayer.model';
import { PieceStateModel, PieceStateModelList } from './ipiece.model';
import { ICoordinates, IBoardDimensions } from './icoordinates.model';
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
