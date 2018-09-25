import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { ID } from '@datorama/akita';

export interface Piece extends IPieceData {
  id: ID;
  threatList: ID[];
  moveList: ID[];
}

export function createPiece(params: IPieceData, id = null, threatList = [], moveList = []) {
  return {
    id,
    threatList,
    moveList,
    ...params
  } as Piece;
}
