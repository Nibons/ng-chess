import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { ID } from '@datorama/akita';
import { Piece } from 'src/app/chess-service/state/piece';

let id = 0;

export interface Position {
  id: ID;
  boardId: ID;
  pieceId: ID | null;
  coordinates: ICoordinates;
}

export function createPosition(params: Partial<Position>, board: ID) {
  return {
    id: id++,
    board: board,
    piece: null,
    ...params
  } as Position;
}
