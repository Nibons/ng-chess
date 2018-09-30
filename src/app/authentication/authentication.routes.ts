import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { AuthGuard } from 'src/app/authentication/_guards/auth.guard';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
]