import { Observable } from 'rxjs';
import { Piece } from 'src/app/chess-service/state/piece';

export interface IPieceType {
  startProcessingThreat(): void;
}
