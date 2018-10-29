import { Injectable } from '@angular/core';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { Piece } from 'src/app/chess-service/state/piece';
import { Observable, merge } from 'rxjs';
import { ID } from '@datorama/akita';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';

@Injectable({ providedIn: 'root' })
export class Pawn extends BasePiece implements IPieceType {
  constructor(
    pieceStreamService: PieceStreamService,
    positionQuery: PositionQuery) {
    super(pieceStreamService, positionQuery);
  }
  pieceType = EPieceType.pawn;

  static pawnThreat(piece: Piece, positionQuery: PositionQuery): Observable<ID> {
    const playerUp: ICoordinates = getPlayerUp(piece.playerNumber);
    const player_NE: ICoordinates = Coordinates.GetDelta(playerUp, { dimensions: [1, 0] });
    const player_NW: ICoordinates = Coordinates.GetDelta(playerUp, { dimensions: [-1, 0] });

    const piece_relative_NE = Coordinates.GetDelta(piece.coordinates, player_NE);
    const piece_relative_NW = Coordinates.GetDelta(piece.coordinates, player_NW);

    return Observable.create().pipe(
      merge(
        positionQuery.selectPositionByCoordinates(piece_relative_NE, piece.boardNumber),
        positionQuery.selectPositionByCoordinates(piece_relative_NW, piece.boardNumber)
      )
    );
  }
  potentialMoveLocationIDs$(piece: Piece): Observable<ID> {
    throw new Error('Method not implemented.');
  }

  threatLocationIDs$(piece: Piece): Observable<ID> {
    return Pawn.pawnThreat(piece, this.positionQuery);
  }
}

function getPlayerUp(playerNumber: number): ICoordinates {
  return playerNumber === 0 ?
    { dimensions: [0, 1] } :
    { dimensions: [0, -1] };
}
