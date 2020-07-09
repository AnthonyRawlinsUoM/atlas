import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import studys from '../assets/data/studyareas.json';
import * as turf from '@turf/turf';

@Injectable({
    providedIn: 'root'
})
export class ShortcutService {

    constructor() { }

    getStudyLinks() {
        return Observable.create((observer) => {

            let res = [];

            studys.features.map((f) => {

                let poly = turf.polygon(f.geometry.coordinates);
                let cent = turf.centroid(poly);

                res.push({
                    name: f.properties.sim_name,
                    link: f.properties.long_name,
                    centroid: cent,
                    bbox: turf.bbox(turf.buffer(poly, 25, { units: 'kilometers' })),
                    lat: cent.geometry.coordinates[1].toFixed(2),
                    lon: cent.geometry.coordinates[0].toFixed(2),
                    order: f.properties.order
                });
            });

            observer.next(res);
        });
    }
}
