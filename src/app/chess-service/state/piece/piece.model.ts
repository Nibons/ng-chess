import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { ID } from '@datorama/akita';
import { IQueryableById } from 'src/app/chess-service/state/shared/queryableById.model';
import { IMove } from 'src/app/chess-service/interfaces/imove.model';

let id = 0;

export interface Piece extends IPieceData, IQueryableById {
  id: ID;
  gameId: ID;
  threatList: ID[];
  moveList: ID[];
  potentialMoveList: IMove[];
}

export function createPiece(pieceInfo: Partial<IPieceData>, template: Partial<IPieceData>, gameId: ID): Piece {
  const params = { ...template, ...pieceInfo } as IPieceData;
  return {
    id: id++,
    gameId: gameId,
    potentialMoveList: [],
    threatList: [],
    moveList: [],
    ...params
  };
}
