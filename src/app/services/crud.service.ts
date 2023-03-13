import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError, take} from "rxjs/operators";

const HEADERS = {};

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private url: string = environment.ApiURL;


  constructor(private http: HttpClient) {

  }

  get(api: string, params?: any): Observable<any | any[]> {

    return this.http.get(this.url + api, {params: params, headers: HEADERS})
      .pipe(
        take(1),
        catchError(() => of([])),
      );
  }

  post(api: string, body: any = {}, params?: any): Observable<any | any[]> {

    return this.http.post(this.url + api, body, {params: params, headers: HEADERS})
      .pipe(
        take(1),
        catchError((err) => of([])),
      );
  }

  put(api: string, body: any, params?: any): Observable<any> {

    return this.http.put(this.url + api, body || {}, {params: params, headers: HEADERS})
  }

  delete(api: string, params?: any) {

    return this.http.delete(this.url + api, {params: params, headers: HEADERS})
      .pipe(take(1));
  }

}
