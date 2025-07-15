import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SubdomainInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const subdomain = window.location.hostname.split('.')[0]; // "valle" o "cucuta"

    const clonedRequest = req.clone({
      setHeaders: {
        'X-Subdomain': subdomain
      }
    });

    return next.handle(clonedRequest);
  }
}
