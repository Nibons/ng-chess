import { ID } from '@datorama/akita';

export interface IPieceAndPosition {
  pieceId: ID;
  positionId: ID;
  playerId: ID;
}

export interface IMove {
  pieceAndPositionList: IPieceAndPosition[];
  pieceAndPositionCount: number;
}

export function MoveFactory(pieceAndPosition: IPieceAndPosition[]): IMove {
  return {
    pieceAndPositionList: pieceAndPosition,
    pieceAndPositionCount: pieceAndPosition.length
  };
}
