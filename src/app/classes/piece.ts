import { IPiece } from 'src/app/interfaces/ipiece';
import { ICoordinate } from 'src/app/interfaces/icoordinate';
import { EPieceType } from 'src/app/enums/epiece-type.enum';
import { IPosition } from 'src/app/interfaces/iposition';
import { Position } from 'src/app/classes/position';

export class Piece implements IPiece {
  playerNumber: number;
  pieceType: EPieceType;
  position: IPosition;
  hasMoved: boolean;
  constructor({ position = new Position({}), hasMoved = false, pieceType = EPieceType.pawn, playerNumber = 0 }: Partial<IPiece>) {
    this.hasMoved = hasMoved;
    this.pieceType = pieceType;
    this.position = position;
    this.playerNumber = playerNumber;
  }
}
