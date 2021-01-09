import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialsInterceptorService implements HttpInterceptor{

  constructor(private auth:AuthService) { }

  intercept(req, next) {
    let credentials = req.clone({
      setHeaders: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(credentials);
  }
}
