import { Queen } from '@chess/queen';
import { Coordinates } from '@chess/coordinates';
import { Piece } from '@chess/piece';
import { IPiece } from '@chess/ipiece.model';
import { IPosition } from '@chess/iposition.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';

export class King extends Piece implements IPiece {
  readonly pieceType = EPieceType.king;
  readonly value = 100; // should be waaaay lower on normal games

  static RefreshKingThreat(piece: IPiece): Guid[] {
    return Queen.RefreshQueenThreat(piece, 1);
  }
  RefreshThreatList(): void { this.threatList = King.RefreshKingThreat(this); }
}
