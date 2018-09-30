import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule } from '@angular/router';
import { routes as authenticationRoutes } from './authentication.routes';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/RoleGuard.service';
import { firebase as firebase_config } from './config/firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    AuthGuard,
    RoleGuard,
    AngularFireModule.initializeApp(firebase_config),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

  ],
  declarations: [AuthenticationComponent],
  providers: [],
  exports: [
    AuthGuard,
    RoleGuard
  ]
})
export class AuthenticationModule { }
