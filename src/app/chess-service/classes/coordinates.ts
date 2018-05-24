import { IPosition } from '@chess/iposition';

export class Coordinates implements IPosition {
  constructor(public x: number, public y: number) { }
}
