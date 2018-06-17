import { RemovePieceFromAllWatchLists } from './../../actions/RemovePieceFromAllWatchLists';
import { BoardState } from '@chess/board-state';
import { PositionState } from '@chess/position-state';
import { IPieceActor } from '@chess/IPieceActor.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PieceState } from '@chess/piece-state';
import { PositionStateModel } from '@chess/iposition.model';
import { BoardStateModel } from '@chess/iboard.model';
import { SetPiece } from '@chess/SetPiece';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
export abstract class BasePiece implements IPieceActor {

  abstract pieceType: EPieceType;
  abstract value: number;
  abstract GetThreatPositionIds(piece: PieceStateModel): number[];
  GetPotentialMovePositionIds(piece: PieceStateModel): number[] {
    return this.GetThreatPositionIds(piece);
  }
  GetWatchList(piece: PieceStateModel): number[] {
    return [...piece.threatList, ...piece.potentialMoves];
  }

  protected pieces$: Observable<PieceStateModel[]> = this.store.select(PieceState.PieceList);
  protected positions$: Observable<PositionStateModel[]> = this.store.select(PositionState.PositionList);
  protected boards$: Observable<BoardStateModel[]> = this.store.select(BoardState.BoardList);


  constructor(protected store: Store) {
    this.WatchAllPieces();
  }

  private WatchAllPieces(): void {
    this.pieces$.subscribe(
      (pieceList: PieceStateModel[]) => pieceList.forEach(
        (piece: PieceStateModel) => {
          this.store.dispatch(new RemovePieceFromAllWatchLists(piece.Id));
          piece.threatList = this.GetThreatPositionIds(piece);
          piece.potentialMoves = this.GetPotentialMovePositionIds(piece);
          this.GetWatchList(piece).forEach(
            (positionId: number) => {
              this.store.dispatch(new AddToPositionWatchList(piece.Id, positionId));
            }
          );
          this.store.dispatch(new SetPiece(piece));
        }
      )
    );
  }
}
