import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError, forkJoin } from 'rxjs';
import {tap, filter, map, concatMap, delay, toArray, catchError, scan } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CitationService {

    configUrl = '/harvardfromdoi/branches/master';

    constructor(private http: HttpClient) { }

    getCitation(doi) {
        // console.log(`GET https://anthonyrawlinsuom.runkit.io${this.configUrl}/${doi}`);

        const requestOptions: Object = {
            responseType: 'text'
        }

        return this.http.get(`${this.configUrl}/${doi}`, requestOptions).pipe(tap(
            data => console.log(data),
            error => console.log(error)
        ));
    }
}
