import { GameItem } from '@chess/game-item';
import { IPosition } from '@chess/iposition.model';
import { IGame } from '@chess/igame.model';
import { Guid } from '@chess/guid';
import { IPiece } from '@chess/ipiece.model';
import { IBoard } from '@chess/iboard.model';
import { ICoordinates } from '@chess/icoordinates.model';
export class Position extends GameItem implements IPosition {
  boardId: number;
  pieceId: number;
  coordinates: ICoordinates;
  IsOnBoard: boolean;
  piece: IPiece = null;
  get IsOccupied(): boolean { return this.piece === null; }
  get IsEmpty(): boolean { return this.IsOccupied === false; }
  get Board(): IBoard { return this.game$.GetBoardById(this.boardId); }
  SetPiece(pieceId: number = null): void { this.piece = piece; }
}
