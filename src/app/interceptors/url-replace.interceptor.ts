import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from "rxjs";

@Injectable()
export class UrlReplaceInterceptor implements HttpInterceptor {
  private serverUrl: string = environment.serverUrl;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const replacedReq = req.clone({ url: this.serverUrl.concat(req.url) });
    return next.handle(replacedReq);
  }

}
