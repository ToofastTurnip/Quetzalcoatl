import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class GlyphService {

  constructor(private http: HttpClient) {}

  getAllGlyphs(): Observable<any> {
    // const headers = new HttpHeaders({
    //   'accept': 'application/ld+json',
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });
    const request = this.http.get(`http://localhost:8080/api/posts`, { responseType: 'text', observe: 'response' }).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res.status === 0) {
          return throwError(() => '');
        } else {
          return throwError(() => res.statusText || 'Something went wrong. Please try again later.');
        }
      }),
      mergeMap(async (response: HttpResponse<string>) => {
        if (response.body) {
          return await JSON.parse(response.body);
        }
      })
    );
    return request;
  }
}
