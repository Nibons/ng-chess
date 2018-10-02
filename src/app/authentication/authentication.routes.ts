import { Routes } from '@angular/router';
import { LoginComponent } from '@authentication/login/login.component';
import { RegisterComponent } from '@authentication/register/register.component';
import { AuthGuard } from '@authentication/_guards/AuthGuard.service';
import { AuthenticationComponent } from '@authentication/authentication.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];
