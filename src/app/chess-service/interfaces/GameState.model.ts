import { BoardStateModel } from '@chess/iboard.model';
import { PlayerStateModel } from '@chess/iplayer.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { OptionsStateModel } from '@chess/options.model';
import { Guid } from '@chess/guid';
import { Observable } from 'rxjs';
import { IGameTemplate } from '@chess/igame-template.model';
export interface GameStateModelList {
  gameList: GameStateModel[];
}
export interface GameStateModel {
  name: string;
  Id: Guid;
  options: OptionsStateModel;
  boards: Observable<BoardStateModel[]>;
  pieces: Observable<PieceStateModel[]>;
  players: Observable<PlayerStateModel[]>;
  template: IGameTemplate;
}


