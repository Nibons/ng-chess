import { SetPieceAtPosition } from '@chess/SetPieceAtPosition';
import { CreateAllPieces } from './../actions/CreateAllPieces';
import { debounce, last } from 'rxjs/operators';
import { BoardState } from '@chess/board-state';
import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SetPiece } from '@chess/SetPiece';
import { Guid } from '@chess/guid';
import { CreatePiece } from '@chess/CreatePiece';
import { SetPieceThreat } from '@chess/SetPieceThreat';
import { SetPiecePotentialMoves } from '@chess/SetPiecePotentialMoves';
import { SetPieceWatchList } from '@chess/SetPieceWatchList';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
import { forkJoin, Observable, timer } from 'rxjs';
import { AllPositionsOnBoardCreated } from '@chess/AllPositionsOnBoardCreated';
import { AllPiecesOnBoardCreated } from '@chess/AllPiecesOnBoardCreated';

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
  private allPiecesCreated$;
  constructor(private actions$: Actions, private store: Store) {
    // on allPositionsCreated, create the pieces
    this.actions$.pipe(
      ofActionSuccessful(AllPositionsOnBoardCreated)
    ).subscribe(
      (action: AllPositionsOnBoardCreated) => {
        store.select(BoardState.BoardList).subscribe(
          boardList => {
            const gameId = boardList.find(b => b.Id.IsEqual(action.boardId)).gameId;
            store.dispatch(new CreateAllPieces(action.pieces, action.boardId, gameId, action.gameInfo, store));
          }
        );
      }
    );
    // onSetPieceAtPosition, check to see if all pieces have been placed
    this.allPiecesCreated$ = this.actions$.pipe(
      ofActionSuccessful(CreatePiece)
    ).pipe(debounce(() => timer(20))).subscribe(
      (action: CreatePiece) => {
        this.store.select(PieceState.PieceList).subscribe(
          (pieceList: PieceStateModel[]) => {
            const piecesCreated = pieceList.filter(piece => piece.gameId.IsEqual(action.gameId));
            const totalPieceCount = action.gameInfo.template.configStateTemplates.pieces.pieces.length;
            if (piecesCreated.length === totalPieceCount) {
              this.store.dispatch(new AllPiecesOnBoardCreated(action.gameInfo, piecesCreated));
              this.allPiecesCreated$.unsubscribe();
            }
          }
        );
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
    if (action.piece !== undefined) {
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
  @Action(CreateAllPieces)
  createAllPieces(action: CreateAllPieces) { }
}
