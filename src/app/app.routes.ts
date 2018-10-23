import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from 'src/app/components/CreateGame/CreateGame.component';
import { GameLayoutComponent } from 'src/app/components/GameLayout/GameLayout.component';
import { GameSaveLoadedGuardService as TemplatesLoadedGuard } from 'src/app/chess-service/state/gamesave/gamesave.loaded.guard';


const rootRoutes: Routes = [
  { path: 'startGame/:templateId', component: CreateGameComponent },
  { path: 'game/:gameId', component: GameLayoutComponent, canActivate: [TemplatesLoadedGuard] },
  { path: '**', redirectTo: 'startGame/0' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(rootRoutes)
  ],
  exports: [RouterModule]
})
export class RootRouterModule { }
