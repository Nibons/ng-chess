import { Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationComponent } from 'src/app/authentication/authentication.component';
import { PageNotFoundComponent } from 'src/app/components/PageNotFound/PageNotFound.component';
import { NewGameComponent } from 'src/app/components/NewGame/NewGame.component';
import { AuthGuard, RoleGuard } from '@authentication/exports';
import { AdminConsoleComponent } from 'src/app/components/AdminConsole/AdminConsole.component';


export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'auth', loadChildren: 'app/authentication/authentication.module#AuthenticationModule', canActivate: [AuthGuard] },
    { path: 'NewGame', component: NewGameComponent },
    { path: 'admin', component: AdminConsoleComponent, canActivate: [RoleGuard] },
    { path: '**', component: PageNotFoundComponent }
]