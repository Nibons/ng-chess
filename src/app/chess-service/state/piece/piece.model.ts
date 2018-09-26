import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { ID } from '@datorama/akita';

let id = 0;

export interface Piece extends IPieceData {
  id: ID;
  threatList: ID[];
  moveList: ID[];
}

export function createPiece(params: IPieceData) {
  return {
    id: id++,
    threatList: [],
    moveList: [],
    ...params
  } as Piece;
}
