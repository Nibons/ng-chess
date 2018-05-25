import { CPlayer } from '@chess/c-player';
import { CBoard } from '@chess/cboard';
import { CPieces } from '@chess/config/cpieces';
import { COptions } from '@chess/config/coptions';

export class GameConfig {
  name: string;
  players: CPlayer[];
  board: CBoard;
  options: COptions;
  pieces: CPieces[];
}
