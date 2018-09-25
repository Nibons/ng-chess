import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { ID } from '@datorama/akita';
import { Piece } from 'src/app/chess-service/state/piece';

export interface Position {
  id: ID;
  board: ID;
  piece: Piece;
  coordinates: ICoordinates;
}

export function createPosition(params: Partial<Position>, board, id = null, piece = null) {
  return {
    board: board,
    id: id,
    piece: piece,
    ...params
  } as Position;
}
