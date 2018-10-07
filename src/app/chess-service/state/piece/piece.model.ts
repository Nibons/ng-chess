import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { ID } from '@datorama/akita';
import { IQueryableById } from 'src/app/chess-service/state/shared/queryableById.model';

let id = 0;

export interface Piece extends IPieceData, IQueryableById {
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
