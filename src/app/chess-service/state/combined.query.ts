import { Injectable } from '@angular/core';

import { PieceQuery } from './piece';
import { PositionQuery } from './position';
import { BoardQuery } from './board';

@Injectable({ providedIn: 'root' })
export class CombinedQuery {

  constructor(
    protected pieceQuery: PieceQuery,
    protected positionQuery: PositionQuery,
    protected boardQuery: BoardQuery
  ) { }
}
