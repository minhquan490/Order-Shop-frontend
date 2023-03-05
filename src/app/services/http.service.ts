import { HttpHeaders } from "@angular/common/http"

export abstract class HttpService {

  public abstract get<T>(url: string, params: Array<HttpParam>): BackendResponse<T>;

  public abstract post<T>(url: string, body: object): BackendResponse<T>;

  public abstract put<T>(url: string, body: object): BackendResponse<T>;

  public abstract delete<T>(url: string, body: object): BackendResponse<T>;

}

export declare type BackendResponse<T> = {
  isError: boolean,
  status: number,
  headers: HttpHeaders,
  body: T | null,
  error: { messages: Array<string> }
}

export declare type HttpParam = {
  name: string,
  value: string | number | boolean
}
