import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { IPieceConstructor } from "@chess/ipiece-constructor.model";

declare module "*.pieces.json" {
  const value: IPieceConstructor[];
  export default value;
}

declare module "*.board.json" {
  const value: IBoardConstructor;
  export default value;
}
