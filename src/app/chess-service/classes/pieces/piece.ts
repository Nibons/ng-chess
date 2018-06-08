import { GameState } from '@chess/game-state';
import { Coordinates } from '@chess/coordinates';
import { IBoard } from '@chess/iboard.model';
import { ICoordinates } from '@chess/icoordinates.model';
import { IPiece, PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { IPlayer } from '@chess/iplayer.model';
import { IPosition } from '@chess/iposition.model';
import { IGame, GameStateModel } from '@chess/igame.model';
import { StateContext, Select } from '@ngxs/store';
import { GameItem } from '@chess/game-item';
export abstract class Piece extends Piece implements IPiece {
  constructor(gameId: Guid) {
    super(gameId);
  }
  abstract pieceType: EPieceType;
  IsPrimary: boolean;
  value: number;
  playerId: Guid;
  positionId: number;
  threatList: number[];
  potentialMoves: number[];
  moves: IPosition[];
  IsAlive = true;
  HasMoved = false;




}
