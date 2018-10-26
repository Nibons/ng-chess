import { IBoardTemplate } from 'src/app/chess-service/interfaces/templates/board-template.model';
import { ID } from '@datorama/akita';

let id = 0;

export interface Board extends IBoardTemplate {
  gameId: ID;
  id: ID;
  positionsPlaced: boolean;
  piecesPlaced: boolean;
}

export function createBoard(params: IBoardTemplate, gameId: ID): Board {
  return {
    id: id++,
    gameId: gameId,
    positionsPlaced: false,
    piecesPlaced: false,
    ...params
  };
}
