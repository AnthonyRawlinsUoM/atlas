import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError, forkJoin } from 'rxjs';
import { filter, map, concatMap, delay, toArray, catchError, scan } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CitationService {

    configUrl = 'https://harvardfromdoi-45iy27o3gqvh.runkit.sh/';

    constructor(private http: HttpClient) { }

   getCitation = (doi) => {
       let citation = '';
       console.log(`Getting: ${doi}`);
       return this.http.get<any>(`${this.configUrl}?doi=${doi}`)
   }

    // getBibliography() {
    //     console.log(this.dois);
    //     return from(this.dois).pipe(
    //         concatMap(doi =>
    //             {
    //                 return this.getCitation(doi);
    //             }
    //         ),
    //         catchError(err => {
    //     	  console.error(err);
    //     	  return of([]);
    //     	})
    //     )
    // }
}
