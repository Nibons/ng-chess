import { Injectable, OnDestroy } from '@angular/core';
import { ID, transaction, action } from '@datorama/akita';
import { PieceStore } from './piece.store';
import { Piece, createPiece } from 'src/app/chess-service/state/piece/piece.model';
import { GameQuery } from 'src/app/chess-service/state/game/game.query';
import { map, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { PositionService } from 'src/app/chess-service/state/position/position.service';
import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { PositionQuery } from 'src/app/chess-service/state/position/position.query';

@Injectable({ providedIn: 'root' })
export class PieceService implements OnDestroy {
  private makePiecesSubsciption: Subscription = new Subscription;

  constructor(
    private pieceStore: PieceStore,
    private gameQuery: GameQuery,
    private positionService: PositionService) {
  }

  ngOnDestroy() {
    this.makePiecesSubsciption.unsubscribe();
  }

  add(piece: Piece): void {
    this.pieceStore.add(piece);
  }
  update(id: ID, piece: Partial<Piece>): void {
    this.pieceStore.update(id, piece);
  }

  populatePiecesInGame(gameId: ID): void {
    const pieceList$: Observable<Piece[]> =
      this.gameQuery.selectPieceListAndDefaultsFromTemplate(gameId).pipe(
        tap(() => this.pieceStore.setLoading(true)),
        map(pieceInfoList =>
          this.PieceDataListToPieceList(pieceInfoList.pieceList, gameId, pieceInfoList.defaults)
        ),
        map(pieceList => this.addList(pieceList)),
        map(pieceList => this.placePieceList(pieceList))
      );
    this.makePiecesSubsciption = pieceList$.subscribe(
      pieceList => console.log(`Piece Made: ${pieceList.length}`),
      (err) => console.log(err),
      () => this.pieceStore.setLoading(false)
    );
  }

  @action({ type: 'Add Piece List' })
  @transaction()
  private addList(pieceList: Piece[]): Piece[] {
    pieceList.forEach(p => this.add(p));
    return pieceList;
  }

  private PieceDataListToPieceList(
    pieceList: Partial<IPieceData>[],
    gameId: ID,
    defaults: Partial<IPieceData>): Piece[] {
    const list: Piece[] = [];
    pieceList.forEach(p => list.push(createPiece(p, gameId, defaults)));
    return list;
  }

  @action({ type: 'Set Pieces at their Coordinates' })
  @transaction()
  private placePieceList(pieceList: Piece[]): Piece[] {
    pieceList.forEach(piece =>
      this.positionService.placePieceAtCoordinates(piece)
    );
    return pieceList;
  }

  kill(): void {
    // TODO implement the kill process here
  }
}
