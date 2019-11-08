import { Output, Component, AfterViewInit, ViewChild, EventEmitter, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ReactiveService } from '../reactive.service';
import { Map } from 'mapbox-gl';
import * as turf from '@turf/turf';
import { easing } from 'ts-easing';
import { Base64 } from 'js-base64';
import studyareas from '../../assets/studyareas.json';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, AfterViewInit {
    @ViewChild('overview', { static: false }) map !: Map;

    @Output() hoveredStateId = null;
    @Output() selectedAreaId = null;
    @Output() selectedArea = null;
    @Output() bounds = new EventEmitter<any>();
    @Output() studyChange = new EventEmitter<any>();

    overview: Map;
    study_areas: any = '/assets/studyareas.json';

    private fragment: any;

    constructor(private route: ActivatedRoute, private reactive: ReactiveService) { }


    ngOnInit() {

    }

    ngAfterViewInit() {
        // console.log(this.map);
        this.overview = this.map;

        this.route.fragment.subscribe(fragment => {
            console.log('Got fragment update!');
            this.fragment = JSON.parse(Base64.decode(fragment));
            console.log(this.fragment);
            this.bounds.emit(this.fragment.bbox);
            this.studyChange.emit(
              studyareas.features.map((f) => {
                if (f.properties.sim_name == this.fragment.name) {
                    return f;
                }
              })
            );
        });

        // this.overview.movingOptions = { padding: 0, easing: easing.quadratic(0.5), maxZoom: 9 };
    }

    mousemove(e) {
        if (e.features.length > 0) {
            this.hoveredStateId = e.features[0].id;
        }
    }

    mouseleave() {
        this.hoveredStateId = null;
    }

    click(e) {
        if (e.features.length > 0) {
            this.selectedAreaId = e.features[0].id;
            this.selectedArea = e.features[0].properties.sim_name;
        }
        // console.log(this.selectedArea);
        e.features[0].state = { 'hover': true };

        let poly = turf.polygon(e.features[0].geometry.coordinates);
        // console.log(poly);

        let bbox = turf.bbox(turf.buffer(poly, 25, { units: 'kilometers' }));
        // console.log(bbox);

        let centroid = turf.centroid(poly);

        // console.log(this.overview);
        this.bounds.emit(bbox);
        this.studyChange.emit(e.features[0]);
    }

    private where(collection, constraint) {
        return collection.filter(collectionItem =>
            Object.keys(constraint).every(key =>
                collectionItem.hasOwnProperty(key) && constraint[key] === collectionItem[key]));
    }
}
