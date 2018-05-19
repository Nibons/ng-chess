import { IPiece } from "../interfaces/ipiece";
import { ETeam } from "../enums/eteam.enum";
import { EPieceType } from "../enums/e-piece-type.enum";
import { Board } from "./board";

export abstract class BasePiece implements IPiece { //remove implements IPiece
  private _alive: boolean = true;
  IsAlive(): boolean {return this._alive}


  abstract pieceType: EPieceType;
  abstract move(target_position): void;

  private _availableMoves: Position[];
  abstract getAvailableMoves(): void;
  getavailableMoves(): Position[] {
    return this._availableMoves;
  }


  constructor(position: Position, pieceType: EPieceType = EPieceType.pawn, private board: Board) {}

  //inherit or override in child pieces
  attack(target_position: Position){
    this.board.getPieceAt(target_position).kill() //try reactive, instead!
    this.move(target_position)
  }

  die(){
    this._alive = false;
  }


}
