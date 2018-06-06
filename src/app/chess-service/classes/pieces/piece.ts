import { Coordinates } from '@chess/coordinates';
import { IBoard } from '@chess/iboard.model';
import { ICoordinates } from '@chess/icoordinates.model';
import { IPiece } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { IPlayer } from '@chess/iplayer.model';
import { IPosition } from '@chess/iposition.model';
import { IGame } from '@chess/igame.model';
export abstract class BasePiece implements IPiece {
  Id: Guid;
  gameId: Guid;
  game: IGame;
  playerNumber: number;
  abstract pieceType: EPieceType;
  IsPrimary: boolean;
  coordinates: ICoordinates;
  value: number;
  playerId: Guid;
  positionId: Guid;
  threatList: IPosition[];
  potentialMoves: IPosition[];
  moves: IPosition[];
  IsAlive = true;
  protected _HasMoved = false;
  protected get board(): IBoard { return this.position.Board; }
  get position(): IPosition { return this.game.GetPositionById(this.positionId); }
  owner(): IPlayer { return this.game.GetPlayerById(this.playerId); }
  HasMoves(): boolean { return this.moves.length > 0; }
  HasMoved(): boolean { return this._HasMoved; }
  GetThreatList(): IPosition[] { return this.threatList; }
  abstract RefreshThreatList();
  abstract RefreshMoveList();
  Move(position: IPosition): boolean {
    throw new Error("Method not implemented.");
  }

  Kill(): void {
    throw new Error("Method not implemented.");
  }
}
