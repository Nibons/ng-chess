import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { GameQuery } from 'src/app/chess-service/state/game/game.query';
import { ID } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class GameGuardService implements CanActivate {
  constructor(
    private gameQuery: GameQuery,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const gameId = route.paramMap.get('gameId') || 0;
    if (this.hasGame(gameId)) {
      this.router.navigate([`/startGame/${gameId}`]);
      return false;
    }
    return true;
  }
  private hasGame(gameId: ID) {
    return this.gameQuery.hasEntity(gameId);
  }
}
