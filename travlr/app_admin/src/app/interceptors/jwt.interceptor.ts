
import { inject } from '@angular/core';
import {
  HttpInterceptorFn
} from '@angular/common/http';
import { Authentication } from '../services/authentication';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(Authentication);

  // Do not attach a token to login or registration requests.
  if (
    req.url.endsWith('/login') ||
    req.url.endsWith('/register')
  ) {
    return next(req);
  }

  // Attach the JWT if the user is logged in.
  if (authenticationService.isLoggedIn()) {
    const token = authenticationService.getToken();

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }

  return next(req);
};
