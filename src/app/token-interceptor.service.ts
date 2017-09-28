import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public authService: AuthService) {
    console.log('authinit');
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const token = this.authService.getToken();
      console.log(token);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(request);
    // return fromPromise(this.authService.getToken())
    //   .switchMap(token => {
    //     const headers = request.headers
    //       .set('Authorization', 'Bearer ' + token)
    //       .append('Content-Type', 'application/json');
    //     const reqClone = request.clone({
    //       headers
    //     });
    //     return next.handle(reqClone);
    //   });
    // return this.authService.getToken()
    //   .then(token => {
    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
    //     return next.handle(request);
    //   });
    //  return this.authService.getToken()
    //   .then(token => {
    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
    //     return fromPromise(next.handle(request));
    //   });
  }
}
