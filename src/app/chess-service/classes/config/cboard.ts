import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { IDimensions } from '@chess/idimensions.model';

export class CBoard {
  constructor(public dimensions: IDimensions = { min: { x: 0, y: 0 }, max: { x: 7, y: 7 } }) { }
}
