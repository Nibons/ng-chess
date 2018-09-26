import { IBoardTemplate } from 'src/app/chess-service/interfaces/templates/board-template.model';
import { ID } from '@datorama/akita';

let id = 0;

export interface Board extends IBoardTemplate {
    id: ID;
    positionsPlaced: boolean;
    piecesPlaced: boolean;
}

export function createBoard(params: IBoardTemplate) {
    return {
        id: id++,
        positionsPlaced: false,
        piecesPlaced: false,
        ...params
    } as Board;
}
