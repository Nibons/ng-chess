import {Board} from './board'
import { IPiece } from '../interfaces/ipiece';

export class Position {
  private _piece: IPiece=null;

  constructor(readonly x: number, readonly y: number, board?: Board, _piece?: IPiece){}

  difference(position: Position): Position {
    return new Position((this.x - position.x),(this.x - position.y));
  }
  IsSamePosition(position: Position): boolean {return this.x == position.x && this.y == position.y};

  SetPiece(piece?: IPiece){
    if(piece){this._piece = piece}else{this._piece=null}
  }
}

