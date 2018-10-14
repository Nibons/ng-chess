import { IBoardTemplate } from 'src/app/chess-service/interfaces/templates/board-template.model';
import { ID } from '@datorama/akita';

let id = 0;

export interface Board extends IBoardTemplate {
  id: ID;
  positionsPlaced: boolean;
  piecesPlaced: boolean;
  rowCount: number;
  columnCount: number;
}

export function createBoard(params: IBoardTemplate): Board {
  return {
    id: id++,
    positionsPlaced: false,
    piecesPlaced: false,
    rowCount: 8,
    columnCount: 8,
    ...params
  };
}
