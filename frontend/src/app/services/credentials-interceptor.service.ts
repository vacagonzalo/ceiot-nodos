import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CredentialsInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req, next) {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    let credentials = req.clone({
      setHeaders: {
        Autorization: token,
        'User-Agent': user
      }
    });
    return next.handle(credentials);
  }
}
