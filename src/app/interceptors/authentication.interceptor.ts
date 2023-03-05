import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { StorageService } from '@service/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private accessTokenHeader: string = environment.accessTokenHeaderName;
  private refreshTokenHeader: string = environment.refreshTokenHeaderName;

  constructor(private store: StorageService) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isExclude(req)) {
      return next.handle(req);
    }
    const newHeaders = req.headers;
    const accessTokenValue = this.store.getItem(this.accessTokenHeader);
    const refreshTokenValue = this.store.getItem(this.refreshTokenHeader);
    newHeaders.append(this.accessTokenHeader, accessTokenValue === null ? "" : accessTokenValue);
    newHeaders.append(this.refreshTokenHeader, refreshTokenValue === null ? "" : refreshTokenValue);
    const injectedReq = req.clone({ headers: newHeaders });
    return next.handle(injectedReq);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isExclude(req: HttpRequest<any>): boolean {
    const url = req.url;
    return url.endsWith("/register") ||
      url.endsWith("/login") ||
      url.endsWith("/logout");
  }
}
