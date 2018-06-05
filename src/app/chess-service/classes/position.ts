import { IPosition } from '@chess/iposition.model';
import { IGame } from '@chess/igame.model';
import { Guid } from '@chess/guid';
import { IPiece } from '@chess/ipiece.model';
import { IBoard } from '@chess/iboard.model';
export class Position implements IPosition {
  Id: Guid;
  gameId: Guid;
  game: IGame;
  boardId: Guid;
  coordinates: Coordinates;
  IsOnBoard: boolean;
  piece: IPiece = null;
  get IsOccupied(): boolean { return this.piece === null; }
  get IsEmpty(): boolean { return this.IsOccupied === false; }
  get Board(): IBoard { return this.game.GetBoardById(this.boardId); }
  SetPiece(piece: IPiece = null): void { this.piece = piece; }
}
