import { Rook } from '@chess/rook';
import { Bishop } from '@chess/bishop';
import { Piece } from '@chess/piece';
import { IPosition } from '@chess/iposition.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';

export class Queen extends Piece implements IPiece {
  readonly value = 9;
  readonly pieceType = EPieceType.queen;
  static RefreshQueenThreat(piece: IPiece, count = Number.MAX_SAFE_INTEGER): Guid[] {
    const position_cache: Guid[] = [];
    Bishop.RefreshBishopThreatList(piece, count).forEach(guid_pos => position_cache.push(guid_pos));
    Rook.RefreshRookThreatList(piece, count).forEach(guid_pos => position_cache.push(guid_pos));
    return position_cache;
  }
  RefreshThreatList(): void { Queen.RefreshQueenThreat(this); }
}
