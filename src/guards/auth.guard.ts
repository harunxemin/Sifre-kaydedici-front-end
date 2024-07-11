import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from 'services/user.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard {
  private connected = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.currentUser
      .subscribe({
        next: (user) => {
          this.connected = user.connected;
        }
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.userService.setCurrentUser = JSON.parse(currentUser);
      this.connected = true;
    }
    if (!this.connected) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return this.connected;
  }
}
