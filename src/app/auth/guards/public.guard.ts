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

import { map, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const PublicGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  var CheckStatuAuth = checkAuthStatus;
  console.log('PublicGuard: ', CheckStatuAuth());
  return true;
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return true;
};

const checkAuthStatus = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const check = authService
    .checkAuthentication()
    .pipe(
      tap((isAuthenticated) =>
        console.log('PublicGuard-checkAuthentication: ', isAuthenticated)
      ),
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      map( (isAuthenticated) => {return !isAuthenticated})

    )
    .subscribe();

};
