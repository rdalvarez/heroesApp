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

  console.log('CanActivate');
  console.log({ route, state });

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated)),
      tap(  isAuthenticated => {
        if( !isAuthenticated ) {
          router.navigate(['./auth/login']);
        }
      } ),

    )
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return true;
};




