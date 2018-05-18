import { IPiece } from "./ipiece";
import { ETeam } from "./eteam.enum";
import { EPieceType } from "./e-piece-type.enum";
import { Board } from "./board";

export class BasePiece { //remove implements IPiece
  //gets these from the constructor (always override)
  private team: ETeam;
  private pieceType: EPieceType;
  private board: Board;
  private position: null;

  //implement in child class pieces
  private move(target_position){};
  private availableMoves(){return null};

  //inherit or override in child pieces
  attack(target_position){
    this.board.getPieceAt(target_position).kill()
    this.move(target_position)
  }
  alive = true;
  kill(){
    this.alive = false;
  }


}
