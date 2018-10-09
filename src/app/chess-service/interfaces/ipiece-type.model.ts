import { Observable } from 'rxjs';
import { Piece } from 'src/app/chess-service/state/piece';

export interface IPieceType {
  selectPieceWithThreatList(pieceStream$: Observable<Piece>): Observable<Piece>;
}
