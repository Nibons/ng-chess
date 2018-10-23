import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GamesaveQuery } from './gamesave.query';

@Injectable({ providedIn: 'root' })
export class GameSaveLoadedGuardService implements CanActivate {

  constructor(private gameSaveQuery: GamesaveQuery, private router: Router) { }
  canActivate(): boolean {
    if (this.loading()) {
      this.router.navigate(['/startGame/0']);
      return false;
    }
    return true;
  }
  private loading() {
    return this.gameSaveQuery.getSnapshot().loading;
  }
}
