import { IPosition } from '../interfaces/iposition';

export class Coordinates implements IPosition {
  constructor(public x: number, public y: number) { }
}
