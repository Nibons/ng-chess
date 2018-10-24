import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GamesaveQuery } from './gamesave.query';

@Injectable({ providedIn: 'root' })
export class GameSaveLoadedGuardService implements CanActivate {

  constructor(private gameSaveQuery: GamesaveQuery, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loading()) {
      const gameId = route.paramMap.get('gameId');
      this.router.navigate([`/startGame/${gameId}`]);
      return false;
    }
    return true;
  }
  private loading() {
    return this.gameSaveQuery.getSnapshot().loading;
  }
}
