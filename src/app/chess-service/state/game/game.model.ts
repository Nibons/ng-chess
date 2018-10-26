
import { ID } from '@datorama/akita';
import { Gamesave } from 'src/app/chess-service/state/gamesave';
import { TabInfo } from 'src/app/components/GameTabs/GameTabs.component';

let id = 0;

export interface Game extends TabInfo {
  id: ID;
  name: string;
  template: Gamesave;
}

export function createGame(params: Gamesave, name: string | null = null): Game {
  const gameName = name ? name : `${params.name}-${id}`;
  return {
    id: id++,
    name: gameName, // TODO fix this, cus this information needs a name
    template: params
  };
}
