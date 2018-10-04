import { Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PageNotFoundComponent } from 'src/app/components/PageNotFound/PageNotFound.component';
import { NewGameComponent } from 'src/app/components/NewGame/NewGame.component';


export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'NewGame', component: NewGameComponent },
  { path: '**', component: PageNotFoundComponent }
];
