import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { ID } from '@datorama/akita';
import { Piece } from 'src/app/chess-service/state/piece';
import { IQueryableById } from 'src/app/chess-service/state/shared/queryableById.model';

let id = 0;

export interface Position extends IQueryableById {
  id: ID;
  boardId: ID;
  pieceId: ID | null;
  coordinates: ICoordinates;
  selected: boolean;
}

export function createPosition(params: Partial<Position>, board: ID): Position {
  const default_position: Position = {
    id: id++,
    boardId: board,
    pieceId: null,
    coordinates: { dimensions: [] },
    selected: false
  };
  return { ...default_position, ...params };
}
