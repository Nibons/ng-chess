import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@authentication/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router, public jwtservice: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const tokenData = this.auth.decodedToken();
    if (!this.auth.isAuthenticated() || tokenData.role !== expectedRole) {
      this.router.navigate(['admin'])
      return false;
    }
    return true;
  }
}
