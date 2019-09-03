import { Output, Component, AfterViewInit, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { ReactiveService } from '../reactive.service';
import { Map } from 'mapbox-gl';
import * as turf from '@turf/turf';
import { easing } from 'ts-easing';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, AfterViewInit {
    @ViewChild('overview', { static: false }) map !: Map;

    studyareas = '/assets/studyareas.json';

    @Output() hoveredStateId = null;
    @Output() selectedAreaId = null;

    @Output() selectedArea = null;
    @Output() bounds = new EventEmitter<any>();
    @Output() study = new EventEmitter<any>();

    overview: Map;

    constructor(private reactive: ReactiveService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // console.log(this.map);
        this.overview = this.map;
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
        this.study.emit(e.features[0]);
    }
}
