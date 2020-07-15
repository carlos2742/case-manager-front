import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class InterceptorService implements HttpInterceptor{

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `    ${localStorage.getItem('AUTH_TOKEN')}`
      }
    });
    return next.handle(request);
  }
}
