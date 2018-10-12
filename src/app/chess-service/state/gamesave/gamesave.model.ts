import { ID } from '@datorama/akita';
import { IGameTemplate } from 'src/app/chess-service/interfaces/templates/game-template.model';

let id = 0;

export interface Gamesave extends IGameTemplate {
  id: ID;
}

export function createGamesave(params: Partial<Gamesave>): Gamesave {
  const default_gameSave: Partial<Gamesave> = {
    id: id++,
    name: 'default_save',
    boards: [],
    players: []
  };
  return {
    ...default_gameSave,
    ...params
  } as Gamesave;
}
