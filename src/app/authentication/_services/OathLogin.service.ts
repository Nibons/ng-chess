import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OathLoginService {

  constructor(private authService: AuthService) { }

  onGoogleLogin() {
    this.authService.loginWithGoogle();
  }

  onFacebookLogin() {
    this.authService.loginWithFacebook();
  }

}
