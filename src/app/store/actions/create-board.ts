import { ICoordinates, IBoardDimensions } from '@chess/icoordinates.model';
import { Guid } from '@chess/guid';
import { BoardStateModel } from '@chess/iboard.model';
export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  constructor(
    gameId: Guid = Guid.newGuid(),
    currentTurnPlayerNumber: number = 0,
    range: IBoardDimensions,
    playerColors = ['white', 'black'],
  ) { }
}
