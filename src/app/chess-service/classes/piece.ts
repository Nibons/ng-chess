import { PositionStateModel } from '@chess/IPosition.model';
import { PositionState } from './../states/position-state';
import { SetPieceProperty } from '@chess/piece.actions';
import { Guid } from './guid';
import { EPieceType } from './../enums/e-piece-type.enum';
import { IGame } from './../interfaces/options.model';
import { GameItem } from '@chess/game-item';
import { ICoordinates } from './../interfaces/icoordinates.model';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { Store, Select } from '@ngxs/store';
import { PieceStateModel } from '@chess/ipiece.model';
import { PieceActions } from '@chess/pieces/piece-actions';
import { BoardStateModel } from '@chess/iboard.model';
import { PieceState } from '@chess/piece-state';
import { Observable, pipe } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { PlacePiece } from '@chess/position.action';


export class Piece extends GameItem implements PieceStateModel {
  // region pulled from pieceState
  @Select(PieceState.getPieceById) pieceFilter$: Observable<(id: number) => PieceStateModel>;
  // pieceSubscription$: Subscription;

  @Select(PositionState.GetPositionByPieceId) positionFilter$: Observable<(Id: number) => PositionStateModel>;
  // positionSubscription$: Subscription;

  // should never change!
  playerId: Guid;

  // may change
  private HasUnavedChanges = false;

  private _pieceType: EPieceType;
  public get pieceType(): EPieceType {
    return this._pieceType;
  }
  public set pieceType(value: EPieceType) {
    if (value !== this.pieceType && value !== undefined) {
      this._pieceType = value;
      this.pieceActions = PieceActions.PieceActionFactory(value, this.coordinates, this.store);
      this.HasUnavedChanges = true;
    }
  }

  private _IsVital: boolean;
  public get IsVital(): boolean {
    return this._IsVital;
  }
  public set IsVital(value: boolean) {
    if (value !== this.IsVital && value !== undefined) {
      this._IsVital = value;
      this.HasUnavedChanges = true;
    }
  }

  private _IsAlive: boolean;
  public get IsAlive(): boolean {
    return this._IsAlive;
  }
  public set IsAlive(value: boolean) {
    if (value !== this.IsAlive && value !== undefined) {
      this._IsAlive = value;
      this.HasUnavedChanges = true;
    }
  }

  private _HasMoved: boolean;
  public get HasMoved(): boolean {
    return this._HasMoved;
  }
  public set HasMoved(value: boolean) {
    if (value !== this.HasMoved && value !== undefined) {
      this._HasMoved = value;
      this.HasUnavedChanges = true;
    }
  }

  private _playerNumber: number;
  public get playerNumber(): number {
    return this._playerNumber;
  }
  public set playerNumber(value: number) {
    if (value !== this.playerNumber && value !== undefined) {
      this._playerNumber = value;
      this.HasUnavedChanges = true;
    }
  }

  private _position: PositionStateModel;
  public get position(): PositionStateModel {
    return this._position;
  }
  public set position(value: PositionStateModel) {
    if (value.Id !== this._position.Id) {
      this.coordinates = value.coordinates;
      this._position = value;
      this.positionId = this._position.Id;
      this.HasUnavedChanges = true;
    }
  }

  private _coordinates: ICoordinates;
  public get coordinates(): ICoordinates {
    return this._coordinates;
  }
  public set coordinates(value: ICoordinates) {
    if (this._coordinates !== value) {
      this._coordinates = value;
      this.pieceActions = PieceActions.PieceActionFactory(this._pieceType, this.coordinates, this.store);
      this.HasUnavedChanges = true;
    }
  }

  private _pieceActions: IPieceActions;
  public get pieceActions(): IPieceActions {
    return this._pieceActions;
  }
  public set pieceActions(value: IPieceActions) {
    if (value !== this.pieceActions) {
      this._pieceActions = value;
      this.value = this.pieceActions.value;
      this.RefreshThreat();
      this.HasUnavedChanges = true;
    }
  }
  value: number;
  positionId: number;
  private _board: BoardStateModel;
  public get boardNumber(): number {
    return this._board.Id;
  }

  public get game(): IGame {
    return this.store.selectSnapshot(state => state.gameList.find(g => g.Id === this.gameId));
  }

  private _threatList: number[];
  public get threatList(): number[] {
    return this._threatList;
  }
  public set threatList(value: number[]) {
    if (this._threatList !== value) {
      this._threatList = value;
      this.HasUnavedChanges = true;
    }
  }

  private _potentialMoves: number[];
  public get potentialMoves(): number[] {
    return this._potentialMoves;
  }
  public set potentialMoves(value: number[]) {
    if (this._potentialMoves !== value) {
      this._potentialMoves = value;
      this.RefreshWatchList();
      this.HasUnavedChanges = true;
    }
  }

  private _positionWatchList: number[];
  public get positionWatchList(): number[] { return this._positionWatchList; }
  public set positionWatchList(value: number[]) {
    if (this.positionWatchList !== value) {
      this.positionWatchList = value;
      this.HasUnavedChanges = true;
    }
  }

  constructor({ Id, gameId, pieceType }: PieceStateModel, private board$: Observable<BoardStateModel>, coordinates: ICoordinates, public store: Store) {
    super(gameId, store);
    this.Id = Id;
    this.pieceType = pieceType;
    board$.subscribe(
      (board: BoardStateModel) => {
        this._board = board;
        store.dispatch(new PlacePiece(Id, coordinates, board.Id));
      }
    );
    this.updateItemProperties(Id);
    this.savePiece();
  }

  private updateItemProperties(Id: number) {
    this.pieceFilter$.pipe(
      map(filterFn => filterFn(Id))
    ).subscribe(
      (response: Partial<PieceStateModel>) => pipe(
        tap((psm: Partial<PieceStateModel>) => this.HasMoved = psm.HasMoved),
        tap((psm: Partial<PieceStateModel>) => this.IsAlive = psm.IsAlive),
        tap((psm: Partial<PieceStateModel>) => this.IsVital = psm.IsVital),
        tap((psm: Partial<PieceStateModel>) => this.pieceType = psm.pieceType),
        tap((psm: Partial<PieceStateModel>) => this.playerId = psm.playerId),
        tap((psm: Partial<PieceStateModel>) => this.playerNumber = psm.playerNumber),
      ));
    this.positionFilter$.pipe(map(filterFn => filterFn(Id))).subscribe(
      (subResult) => pipe(
        pipe((pos: PositionStateModel) => this.position = pos)
      ));
  }

  public RefreshThreat() {
    this.threatList = this.pieceActions.GetThreatPositionIds(this);
    this.RefreshPotentialMoves();
  }

  public RefreshPotentialMoves() {
    this.potentialMoves = this.pieceActions.GetPotentialMovePositionIds(this);
  }
  public RefreshWatchList() {
    this.positionWatchList = [this.positionId, ...this.threatList, ...this.potentialMoves];
  }

  private savePiece() {
    const pieceStateModel: Partial<PieceStateModel> = {
      gameId: this.gameId,
      Id: this.Id,
      HasMoved: this.HasMoved,
      IsAlive: this.IsAlive,
      IsVital: this.IsVital,
      pieceType: this.pieceType,
      playerId: this.playerId,
      playerNumber: this.playerNumber,
      value: this.value,
      potentialMoves: this.potentialMoves,
      threatList: this.threatList
    };
    if (this.HasUnavedChanges) {
      this.store.dispatch(new SetPieceProperty(pieceStateModel));
    }
  }
}
