import { IPosition } from '@chess/iposition';
import { ChessObject } from '@app/chess-service/classes/chess-object';

export class Coordinates extends ChessObject implements IPosition {
  constructor(public x: number, public y: number) {
    super();
  }
}
