import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameLayoutComponent } from 'src/app/components/GameLayout/GameLayout.component';
import { NewGameComponent } from 'src/app/components/GameTabs/NewGame/NewGame.component';
// import { GameGuardService as GameExists } from 'src/app/chess-service/state/game/game.guard';

const rootRoutes: Routes = [
  { path: 'newGame/:templateId', component: NewGameComponent },
  { path: 'game/:gameId', component: GameLayoutComponent },
  { path: '**', redirectTo: 'game/0' }
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
