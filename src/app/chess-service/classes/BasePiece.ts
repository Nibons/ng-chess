import { Piece } from 'src/app/chess-service/state/piece';
import { GameService } from 'src/app/chess-service/classes/GameService';
import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';

import { Observable, Subscription, Subject } from 'rxjs';
import { map, mergeMap, reduce, withLatestFrom } from 'rxjs/operators';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { Injectable, OnDestroy } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BasePiece implements IPieceData, IPieceType, OnDestroy {
  protected pieceStreamSubscription = new Subscription;
  protected pieceStreamThreatSubscription = new Subscription;

  protected pieceOfThisType$: Subject<Piece> = new Subject<Piece>();

  playerNumber = 0;
  pieceType: EPieceType = EPieceType.base;
  coordinates: ICoordinates = new Coordinates([0, 0]);
  HasMoved = false;
  IsVital = false;
  boardNumber = 0;

  constructor(
    protected pieceStreamService: PieceStreamService,
    protected positionQuery: PositionQuery
  ) {
    this.pieceStreamSubscription =
      pieceStreamService.piecesFilteredByType$(this.pieceType)
        .subscribe(piece => this.pieceOfThisType$.next(piece));
  }

  ngOnDestroy() {
    this.pieceStreamSubscription.unsubscribe();
    this.pieceStreamThreatSubscription.unsubscribe();
  }

  startProcessingThreat() {
    this.pieceStreamThreatSubscription =
      this.ActOnPieceStreamThreatList(this.pieceOfThisType$);
  }

  protected ActOnPieceStreamThreatList(pieceStream$: Observable<Piece>): Subscription {
    return pieceStream$.pipe(
      mergeMap(piece => this.threatLocationIdList$(piece)),
      withLatestFrom(pieceStream$)
    ).subscribe(
      ([list, piece]) => this.pieceStreamService.pushPieceWithThreatList(piece, list)
    );
  }

  // TODO
  // public selectPieceWithPotentialMoveList(pieceStream$: Observable<Piece>): Observable<Piece> {
  //   return pieceStream$.pipe(
  //     mergeMap(piece => this.potentialMoveList$(piece)),
  //     withLatestFrom(pieceStream$),
  //     map(
  //       ([potentialMoveList, piece]) => {
  //         return piece;
  //       }
  //     )
  //   );
  // }

  abstract threatLocationIdList$(piece: Piece): Observable<ID[]>;
  abstract potentialMoveLocationIdList$(piece: Piece): Observable<ID[]>;
}
