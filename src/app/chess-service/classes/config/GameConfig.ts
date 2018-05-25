import { CPlayer } from '@chess/c-player';
import { CBoard } from '@chess/cboard';
import { CPiece } from '@chess/config/cpiece';
import { COptions } from '@chess/config/coptions';

export class GameConfig {
  name: string;
  players: CPlayer[];
  board: CBoard;
  options: COptions;
  pieces: CPiece[];
}
