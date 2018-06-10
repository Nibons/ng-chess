import { GameState } from '@chess/game-state';
import { GameStateModelList } from './../interfaces/igame.model';
import { GameStateModel } from '@chess/igame.model';
import { IPosition } from '@chess/IPosition.model';
import { IPlayer } from '@chess/iplayer.model';
import { IBoard } from '@chess/iboard.model';
import { IGame } from '@chess/igame.model';
import { Guid } from '@chess/guid';
import { Store, Select, StateContext } from '@ngxs/store';
import { IPiece } from '@chess/ipiece.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { state } from '@angular/animations';
export class Game implements GameStateModel {
  @Select(GameState.GetGame) gameQuery$: Observable<(Id: Guid) => GameStateModel>;
  public game: GameStateModel;
  public colorList: string[];
  public currentTurnPlayerNumber: number;
  public friendlyFire: boolean;
  constructor(public Id: Guid, public store: Store) {
    this.setGame$(this.Id);
    this.game = store.selectSnapshot<GameStateModelList>((state: GameState) => state.getGameList()).games.find(g => g.Id === this.Id);
  }
  private setGame$(Id: Guid) {
    this.gameQuery$
      .pipe(map(filterFn => filterFn(Id)))
      .subscribe(g => this.game = g);
  }
  GetPlayerById(playerId: number): IPlayer {
    throw new Error('Method not implemented.');
  }
  GetBoardById(boardId: number): IBoard {
    throw new Error('Method not implemented.');
  }
  GetPositionById(positionId: number): IPosition {
    throw new Error('Method not implemented.');
  }
  GetPieceById(pieceId: number): IPiece {
    throw new Error('Method not implemented.');
  }
}
