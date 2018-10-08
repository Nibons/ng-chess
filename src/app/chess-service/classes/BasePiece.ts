import { Piece } from 'src/app/chess-service/state/piece';
import { GameService } from 'src/app/chess-service/classes/GameService';
import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';

import { Observable } from 'rxjs';
import { map, mergeMap, reduce, withLatestFrom } from 'rxjs/operators';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionQuery } from 'src/app/chess-service/state/position';

export abstract class BasePiece implements IPieceData {
  playerNumber = 0;
  pieceType: EPieceType = EPieceType.base;
  coordinates: ICoordinates = new Coordinates([0, 0]);
  HasMoved = false;
  IsVital = false;
  boardNumber = 0;

  processPieceList: Observable<Piece>;

  static PieceFactory(pieceTemplate: Partial<IPieceData>, pieceDefaults: Partial<IPieceData>, gameService: GameService) {
    const pieceInfo = BasePiece.combine(pieceTemplate, pieceDefaults) as Piece;
    gameService.publishToPieceList(pieceInfo);
  }

  private static combine(
    pieceTemplate: Partial<IPieceData>,
    pieceDefaults: Partial<IPieceData>
  ): IPieceData {
    return { ...pieceDefaults, ...pieceTemplate } as IPieceData;
  }

  constructor(protected gameService: GameService) {

    this.processPieceList = gameService.processPieceList
      .pipe(
        filter((piece: Piece) => piece.pieceType === this.pieceType)
      );

    this.processPieceList.subscribe(
      (piece: Piece) => this.processPiece(piece),
      () => console.error('Error on IPiece')
    );
  }

  abstract processPiece(piece: Piece): void;

}
