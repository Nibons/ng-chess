import { IPieceData, pieceDefaults } from 'src/app/chess-service/interfaces/ipiece-data.model';
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

export function createPiece(
  pieceInfo: Partial<IPieceData>,
  gameId: ID,
  template: Partial<IPieceData> = pieceDefaults,
): Piece {
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

export function mergePieceListAndDefault(
  pieceList: Partial<IPieceData>[],
  template: Partial<IPieceData>): { piece: Partial<IPieceData>, template: Partial<IPieceData> }[] {
  const list: { piece: Partial<IPieceData>, template: Partial<IPieceData> }[] = new Array();
  pieceList.forEach(
    piece => list.push({ piece, template })
  );
  return list;
}
