import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError, forkJoin } from 'rxjs';
import { tap, retry, filter, map, concatMap, delay, toArray, catchError, scan } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CitationService {

    // Uses proxy.conf.json to alleviate CORS problem
    configUrl = 'https://prescribedburnatlas.science';

    constructor(private http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    public getCitation(doi) {
        let citation_string: string;

        let url = `${this.configUrl}/${doi}/harvard`;

        // console.log(url);

        return this.http.get(url, { observe: 'response' });
    }
}
