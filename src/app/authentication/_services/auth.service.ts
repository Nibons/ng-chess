import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { resolve } from 'path';
import { JwtHelperService } from '@auth0/angular-jwt';

import { firebase as firebase_config } from '../config/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token == null) { return false } else {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  decodedToken() {
    const token = localStorage.getItem('token');
    if (token == null) {

    } else {
      return this.jwtHelper.decodeToken(token)
    }
  }

  // method from another document
  // doGoogleLogin() {
  //   return new Promise<any>((resolve, reject) => {
  //     let provider = new firebase.auth.GoogleAuthProvider();
  //     provider.addScope('profile');
  //     provider.addScope('email');
  //     this.afAuth.auth
  //       .signInWithPopup(provider)
  //       .then(res => {
  //         resolve(res);
  //       })
  //   })
  // }

  loginWithGoogle() {
    // from https://codeburst.io/angular-6-firebase-gallery-serverless-with-authentication-8a2e005adccf
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('profile');
        provider.addScope('email');
        return firebase.auth().signInWithPopup(provider);
      })
      .catch(function (error: { code: any, message: any }) {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      })
  }

  loginWithFacebook() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        const provider = new firebase.auth.FacebookAuthProvider()
        return firebase.auth().signInWithPopup(provider);
      })
  }

  doRegister(value: { email: string, password: string }) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }
}
