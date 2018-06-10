import { ICoordinates } from './../interfaces/icoordinates.model';
import { PositionState } from '@chess/position-state';
import { PlayerState } from './../../store/states/player-state';
import { GameState } from '@chess/game-state';
import { GameStateModel } from '@chess/igame.model';
import { PositionStateModel } from '@chess/IPosition.model';
import { PlayerStateModel } from '@chess/iplayer.model';
import { BoardStateModel } from '@chess/iboard.model';
import { IGame } from '@chess/igame.model';
import { Guid } from '@chess/guid';
import { Store } from '@ngxs/store';
import { PieceStateModel } from '@chess/ipiece.model';
import { BoardState } from '@chess/board-state';
import { PieceState } from '@chess/piece-state';
import { Coordinates } from '@chess/coordinates';

export class Game implements IGame {
  public IdCounter: number;
  public gameState: GameStateModel;
  public colorList: string[];
  public currentTurnPlayerNumber: number;
  public friendlyFire: boolean;

  constructor(public Id: Guid = Guid.newGuid(), public store: Store) {
    this.gameState = store.selectSnapshot(GameState.GameList)
      .find(g => g.Id === this.Id);
    this.setVariables();
  }
  private setVariables() {
    this.IdCounter = this.gameState.IdCounter;
    this.colorList = this.gameState.colorList;
    this.currentTurnPlayerNumber = this.gameState.currentTurnPlayerNumber;
    this.friendlyFire = this.gameState.friendlyFire;
  }
  GetPlayerById(playerId: number): PlayerStateModel {
    return this.store.selectSnapshot(PlayerState.PlayerList)
      .find(p => p.Id === playerId && p.gameId === this.Id);
  }
  GetBoardById(boardId: number): BoardStateModel {
    return this.store.selectSnapshot(BoardState.BoardList)
      .find(b => b.Id === boardId && b.gameId === this.Id);
  }
  GetPositionById(positionId: number): PositionStateModel {
    return this.store.selectSnapshot(PositionState.PositionList)
      .find(p => p.Id === positionId && p.gameId === this.Id);
  }
  GetPieceById(pieceId: number): PieceStateModel {
    return this.store.selectSnapshot(PieceState.PieceList)
      .find(p => p.Id === pieceId && p.gameId === this.Id);
  }
  GetPositionByCoordinates(coordinates: ICoordinates): PositionStateModel {
    return this.store.selectSnapshot(PositionState.PositionList)
      .find(p => p.gameId === this.Id && Coordinates.IsSameCoordinates(p.coordinates, coordinates));
  }
  GetPositionByPieceId(pieceId: number): PositionStateModel {
    return this.store.selectSnapshot(PositionState.PositionList)
      .find(p => p.pieceId === pieceId);
  }
}
