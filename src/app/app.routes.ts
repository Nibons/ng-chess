import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGameComponent } from 'src/app/components/NewGame/NewGame.component';
import { GameLayoutComponent } from 'src/app/components/GameLayout/GameLayout.component';
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
