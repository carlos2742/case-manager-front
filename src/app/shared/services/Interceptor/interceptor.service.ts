import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";

export interface IResponse {
  data: Object
  success: boolean;
  error: any;
}

@Injectable()
export class InterceptorService implements HttpInterceptor{

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('AUTH_TOKEN')}`
      }
    });
    return next.handle(request).pipe(
      tap(response =>{
        if(response instanceof HttpResponse){
          if(response['body']['errors'] && response['body']['errors'].length > 0){
            console.log('unautorized');
          }
        }
      })
    );
  }
}
