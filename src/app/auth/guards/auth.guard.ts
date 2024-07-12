import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { inject } from '@angular/core';

import { tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate', { route, state });

  var CheckStatuAuth = checkAuthStatus;
  return CheckStatuAuth();
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch', { route, segments });

  var CheckStatuAuth = checkAuthStatus;
  return CheckStatuAuth();
};

const checkAuthStatus = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) =>
      console.log('AuthGuard-checkAuthentication: ', isAuthenticated)
    ),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['./auth/login']);
      }
    })
  );
};
