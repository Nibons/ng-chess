import { BasePiece } from "./base-piece";
import { IPiece } from "../interfaces/ipiece";
import { Team } from "./team";

export class knight extends BasePiece implements IPiece {
  private _availableMoves: Position[];

}
