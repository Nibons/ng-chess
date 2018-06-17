import { filter } from 'rxjs/operators';
import { PlayerStateModel } from './../interfaces/iplayer.model';
import { Observable } from 'rxjs';
import { GameStateModel } from '@chess//GameState.model';
import { IGameTemplate } from '@chess/igame-template.model';
import { Guid } from '@chess/guid';
import { Select } from '@ngxs/store';
import { BoardStateModel } from '@chess/iboard.model';
import { PieceState } from '@chess/piece-state';
import { PieceStateModel } from '@chess/ipiece.model';
import { PlayerState } from '@chess/player-state';
export class NewGame {
  static readonly type = '[Game] CreateGame';
  private Id: Guid;
  public payload: GameStateModel;
  public get gameInfo(): GameStateModel {
    return {
      name: this.template.name,
      Id: this.Id,
      options: this.template.configStateTemplates.options,
      boards: null,
      pieces: null,
      players: null,
      template: this.template
    };
  }
  constructor(private template: IGameTemplate) {
    this.Id = Guid.newGuid();
    this.payload = this.gameInfo;
  }
}
