import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Configs
import { firebase as firebase_config } from './_config/firebase.config';
import { routes as authentication_routes } from './authentication.routes';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Guards
import { AuthGuard } from './_guards/AuthGuard.service';
import { RoleGuard } from './_guards/RoleGuard.service';

// Components
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from '@authentication/login/login.component';
import { RegisterComponent } from '@authentication/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authentication_routes),
    AuthGuard,
    RoleGuard,
    AngularFireModule.initializeApp(firebase_config),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent
  ],
  declarations: [AuthenticationComponent, LoginComponent, RegisterComponent],
  providers: [],
  exports: [
    AuthGuard,
    RoleGuard
  ]
})
export class AuthenticationModule { }
