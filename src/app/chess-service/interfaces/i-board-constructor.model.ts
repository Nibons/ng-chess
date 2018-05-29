import { IDimensions } from '@chess/idimensions.model';

export interface IBoardConstructor {
  friendlyFire: boolean;
  dimensions: IDimensions;
  playerColors: string[];
  currentTurnPlayerNumber: number;
}
