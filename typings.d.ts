import { BoardStateModel } from '@chess/iboard.model';
import { PieceStateModel } from '@chess/ipiece.model';
declare module "*.pieces.json" {
  const value: PieceStateModel[];
  export default value;
}

declare module "*.board.json" {
  const value: BoardStateModel;
  export default value;
}
