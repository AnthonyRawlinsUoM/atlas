import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
    providedIn: 'root'
})
export class WeightsService {

    // private url = '/assets/PointDistance/csl_landpt_dist.csv';
    private url = '/assets/test.json';

    constructor(private http: HttpClient) { }

    public getData = () => {
        console.log('Loading weights now...');
        return this.http.get(this.url);
    }
}
