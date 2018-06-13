import { filter } from 'rxjs/operators';
import { PlayerStateModel } from './../interfaces/iplayer.model';
import { Observable } from 'rxjs';
import { BoardState } from './../states/board-state';
import { GameStateModel } from '@chess//GameState.model';
import { IGameTemplate } from '@chess/igame-template.model';
import { Guid } from '@chess/guid';
import { Select, Store } from '@ngxs/store';
import { BoardStateModel } from '@chess/iboard.model';
import { PieceState } from '@chess/piece-state';
import { PieceStateModel } from '@chess/ipiece.model';
import { PlayerState } from '@chess/player-state';

export class IncrementIdCounter {
  static readonly type = '[IdCounter] IncrementIdCounter';
}
export class NewGame {
  static readonly type = '[Game] CreateGame';
  private Id: Guid;
  @Select(BoardState.BoardList) boardList$: Observable<BoardStateModel[]>;
  @Select(PieceState.PieceList) pieceList$: Observable<PieceStateModel[]>;
  @Select(PlayerState.PlayerList) playerList$: Observable<PlayerStateModel[]>;

  public get gameInfo(): GameStateModel {
    return {
      name: this.template.name,
      Id: this.Id,
      options: this.template.configStateTemplates.options,
      boards: this.boardList$.lift(filter((b: BoardStateModel) => b.gameId === this.Id)),
      pieces: this.pieceList$.lift(filter((p: PieceStateModel) => p.gameId === this.Id)),
      players: this.playerList$.lift(filter((p: PlayerStateModel) => p.gameId === this.Id)),
      template: this.template
    };
  }
  constructor(private template: IGameTemplate) {
    this.Id = Guid.newGuid();
  }
}
