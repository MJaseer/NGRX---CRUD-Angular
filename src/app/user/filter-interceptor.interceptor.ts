import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
// import { Books } from './store/books';

@Injectable()
export class FilterInterceptorInterceptor implements HttpInterceptor, OnInit{

  constructor() {}

  ngOnInit(): void {
    console.log('interceptor called');
  }

  logged = false
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('fuck you bitches');
    const token = 'token'
    if(!this.logged){
      return EMPTY
    }

    // Pass the modified request to the next interceptor or to the HTTP handler
    return next.handle(req);
  }
}
