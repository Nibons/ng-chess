import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameConsoleComponent } from 'src/app/components/GameConsole/GameConsole.component';
import { CreateGameComponent } from 'src/app/components/CreateGame/CreateGame.component';

const rootRoutes: Routes = [
  { path: 'startGame/:templateId', component: CreateGameComponent },
  { path: 'game/:gameId', component: GameConsoleComponent },
  { path: '**', redirectTo: 'startgame/0' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(rootRoutes)
  ],
  exports: [RouterModule]
})
export class RootRouterModule { }
