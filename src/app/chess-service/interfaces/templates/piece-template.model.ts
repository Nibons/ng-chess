import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';

export interface IPieceTemplate {
  boardType: string;
  pieces: Partial<IPieceData>[];
  pieceDefaults: Partial<IPieceData>;
}
