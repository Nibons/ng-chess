import { BoardStateModelList } from '@chess/iboard.model';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { PieceStateModelList } from '@chess/ipiece.model';
import { OptionsStateModel } from '@chess/options.model';
import { Guid } from '@chess/guid';
export interface GameStateModelList {
  gameList: GameStateModel[];
}
export interface GameStateModel {
  name: string;
  Id: Guid;
  options: OptionsStateModel;
  boards: BoardStateModelList;
  pieces: PieceStateModelList;
  players: PlayerStateModelList;
}


