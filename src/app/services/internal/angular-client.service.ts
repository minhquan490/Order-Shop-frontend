import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendResponse, HttpParam, HttpService } from '@service/http.service';
import { Observable } from 'rxjs';

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
    const response: BackendResponse<T> = {
      isError: false,
      status: -1,
      body: null,
      headers: new HttpHeaders(),
      error: {
        messages: []
      }
    };
    req.subscribe(res => {
      if (typeof res.body === 'string') {
        response.body = JSON.parse(res.body);
      }
      response.status = res.status;
      response.headers = res.headers;
      if (res.status >= 400) {
        response.isError = true;
        response.error = res.body === null ? [] : JSON.parse(res.body);
      }
    });
    return response;
  }
}
