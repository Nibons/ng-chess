
import { ID } from '@datorama/akita';
import { Gamesave } from 'src/app/chess-service/state/gamesave';

export interface Game {
  id: ID;
  name: string;
  board: ID[];
  template: Gamesave;
}

export function createGame(params: Gamesave) {
  return {
    id: null,
    name: '',
    board: null
  } as Game;
}
