import { IPiece } from 'src/app/chess-service/interfaces/ipiece.model';

export interface IPieceTemplate {
  boardType: string;
  pieces: Partial<IPiece>[];
  pieceDefaults: Partial<IPiece>;
}
