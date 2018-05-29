import { IPosition } from '@chess/iposition';
import { ChessObject } from '@app/chess-service/classes/chess-object';
export interface ICoordinatesConstructor { // should only be used here.
  x: number;
  y: number;
}

export class Coordinates implements IPosition {
  readonly x: number;
  readonly y: number;

  constructor(position: ICoordinatesConstructor | number[]) {
    this.x = (<number[]>position[0]).length ? position[0] : (<ICoordinatesConstructor>position).x;
    this.y = (<number[]>position[0]).length ? position[0] : (<ICoordinatesConstructor>position).y;
  }
}
