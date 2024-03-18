import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../auth/services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (this.authenticationService.isLoggedIn()) {
    //   let newRequest = request.clone({
    //     setHeaders: {
    //       Authorization: `${sessionStorage.getItem('bearer')} ${this.authenticationService.getToken()}`
    //     }
    //   });
    //   return next.handle(newRequest);
    // };
    // return next.handle(request);

    let intReq = request;
    const token = this.authenticationService.getToken();
    if (token != null) {
      intReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(intReq);
  }
}

