import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendResponse, HttpParam, HttpService } from '@service/http.service';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AngularClientHttp implements HttpService {

  constructor(private client: HttpClient) { }

  public get<T>(url: string, params: Array<HttpParam>): BackendResponse<T> {
    const httpParams = new HttpParams();
    params.forEach(param => httpParams.set(param.name, param.value));
    const req = this.client.get<string>(url, { observe: 'response', responseType: 'json', params: httpParams })
    return this.subscribe(req);
  }

  public post<T>(url: string, body: object): BackendResponse<T> {
    const req = this.client.post<string>(url, JSON.stringify(body), { observe: 'response', responseType: 'json' });
    return this.subscribe(req);
  }

  public put<T>(url: string, body: object): BackendResponse<T> {
    const req = this.client.put<string>(url, JSON.stringify(body), { observe: 'response', responseType: 'json' });
    return this.subscribe(req);
  }

  public delete<T>(url: string, body: object): BackendResponse<T> {
    const req = this.client.delete<string>(url, { body: JSON.stringify(body), observe: 'response', responseType: 'json' });
    return this.subscribe(req);
  }

  private subscribe<T>(req: Observable<HttpResponse<string>>): BackendResponse<T> {
    let result: BackendResponse<T> | undefined;
    const transform = req.pipe(map(res => {
      return {
        isError: false,
        status: res.status,
        body: typeof res.body === 'string' ? JSON.parse(res.body) : null,
        headers: res.headers,
        error: {
          messages: []
        }
      } as BackendResponse<T>;
    }));
    firstValueFrom(transform)
      .then(res => {
        result = res;
      })
      .catch(err => {
        const responseErr: HttpErrorResponse = err as HttpErrorResponse;
        result = {
          isError: true,
          status: responseErr.status,
          body: null,
          headers: responseErr.headers,
          error: {
            messages: typeof responseErr.error === 'string' ? JSON.parse(responseErr.error) : [responseErr.statusText]
          }
        };
      });
    return result as BackendResponse<T>;
  }
}
