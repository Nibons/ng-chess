import { CreateAllPieces } from './../actions/CreateAllPieces';
import { debounce, last } from 'rxjs/operators';
import { AllPiecesCreatedOnBoard } from '@chess/AllPiecesCreated';
import { BoardState } from '@chess/board-state';
import { AllPositionsOnBoardCreated } from '@chess/AllPositionsCreatedOnBoard';
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
      ({ pieces, gameInfo, boardId }: AllPositionsOnBoardCreated) => {
        store.select(BoardState.BoardList).subscribe(
          boardList => {
            const gameId = boardList.find(b => b.Id.IsEqual(boardId)).gameId;
            store.dispatch(new CreateAllPieces(pieces, boardId, gameId, gameInfo, actions$, store));
          }
        );
      }
    );

    // create all pieces
    this.actions$.pipe(
      ofActionSuccessful(CreateAllPieces)
    ).subscribe(
      ({ pieces, gameId, gameInfo }: CreateAllPieces) => {
        for (const piece of pieces) {
          store.dispatch(new CreatePiece(piece, gameId, gameInfo, store));
        }
      }
    );

    // on created pieces
    this.allPiecesCreated$ = this.actions$.pipe(
      ofActionSuccessful(CreatePiece)
    ).pipe(debounce(() => timer(10)), last()).subscribe(
      ({ gameInfo, gameId }: CreatePiece) => {
        this.store.select(PieceState.PieceList).subscribe(
          (pieceList: PieceStateModel[]) => {
            const pieces = pieceList.filter(piece => piece.gameId.IsEqual(gameId));
            const totalPieceCount = gameInfo.template.configStateTemplates.pieces.pieces.length;
            if (pieces.length === totalPieceCount) {
              this.store.dispatch(new AllPiecesCreatedOnBoard(gameInfo, pieces, this.store));
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
}
