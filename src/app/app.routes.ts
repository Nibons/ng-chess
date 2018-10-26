import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from 'src/app/components/CreateGame/CreateGame.component';
import { GameLayoutComponent } from 'src/app/components/GameLayout/GameLayout.component';
import { GameGuardService as GameExists } from 'src/app/chess-service/state/game/game.guard';

const rootRoutes: Routes = [
  { path: 'startGame/:templateId', component: CreateGameComponent },
  { path: 'game/:gameId', component: GameLayoutComponent },
  { path: '**', redirectTo: 'startGame/1' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(rootRoutes,
      // { enableTracing: true }
    )
  ],
  providers: [],
  exports: [RouterModule]
})
export class RootRouterModule { }
