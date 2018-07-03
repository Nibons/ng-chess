import { Guid } from '@chess/guid';

export interface PartialOptionsStateModel {
  colorList: string[];
  currentTurnPlayerNumber: Guid;
  friendlyFire: boolean;
}
export interface OptionsStateModelList {
  optionSets: OptionsStateModel[];
}
export interface OptionsStateModel extends PartialOptionsStateModel {
  Id: Guid;
}
