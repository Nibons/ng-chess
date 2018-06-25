import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SetPiece } from '@chess/SetPiece';
import { Guid } from '@chess/guid';
import { CreatePiece } from '@chess/CreatePiece';
import { SetPieceThreat } from '@chess/SetPieceThreat';
import { SetPiecePotentialMoves } from '@chess/SetPiecePotentialMoves';
import { SetPieceWatchList } from '@chess/SetPieceWatchList';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
import { forkJoin, Observable } from 'rxjs';

@State<PieceStateModelList>({
  name: 'pieces',
  defaults: {
    pieces: [
      {
        Id: null,
        gameId: null,
        playerNumber: null,
        playerId: null,
        pieceType: null,
        IsVital: null,
        IsAlive: null,
        HasMoved: null,
        positionId: null,
        threatList: null,
        potentialMoves: null,
        value: null,
        boardNumber: null,
        coordinates: null
      }
    ]
  }
})
export class PieceState {
  constructor(private actions$: Actions, private store: Store) {
    this.actions$.pipe(
      ofActionSuccessful(CreatePiece)
    ).subscribe(
      ({ piece }: CreatePiece) => {
        if (piece.Id) {
          const pieceList = store.selectSnapshot(PieceState.PieceList);
          const piecesLikeThis = pieceList.filter(p => p.Id.IsEqual(piece.Id));
          if (piecesLikeThis.length > 1) {
            console.log('DuplicatePiece:');
            console.log(`Player: ${piece.playerNumber}\nPieceType:${piece.pieceType}\nCoordinates:${piece.coordinates.dimensions}`);
          }
        }
      }
    );
  }
  @Selector() static PieceList(state: PieceStateModelList): PieceStateModel[] {
    return state.pieces;
  }
  @Selector() static getPieceById(state: PieceStateModelList) {
    return (Id: Guid) => {
      return state.pieces.find((piece: PieceStateModel) => piece.Id === Id);
    };
  }

  @Action(SetPiece)
  setPiece({ getState, patchState }: StateContext<PieceStateModelList>, action: SetPiece) {
    if (getState().pieces[0].Id === null) {
      patchState({ pieces: [action.piece] });
    } else {
      patchState({
        pieces: [
          ...getState().pieces.filter((p: PieceStateModel) => !p.Id.IsEqual(action.piece.Id)),
          action.piece
        ]
      });
    }
  }
  @Action(CreatePiece)
  createPiece() { }

  @Action(SetPieceThreat)
  SetPieceThreat({ piece }: SetPieceThreat) {
    // const pieceActor = (new GetPieceActor(piece.pieceType)).PieceActor;
    this.store.dispatch(new SetPiece(piece));
  }
  @Action(SetPiecePotentialMoves)
  SetPiecePotentialMoves({ piece }: SetPiecePotentialMoves) {
    this.store.dispatch(new SetPiece(piece));
  }

  @Action(SetPieceWatchList)
  setPieceWatchList({ positions, pieceId }: SetPieceWatchList) {
    let addToList$: Observable<any>;
    positions.forEach(
      positionId => {
        addToList$ = forkJoin(addToList$,
          this.store.dispatch(new AddToPositionWatchList(pieceId, positionId))
        );
      }
    );
    return addToList$;
  }
}
