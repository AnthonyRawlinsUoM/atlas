import { Output, Component, AfterViewInit, ViewChild, EventEmitter, OnInit, Input } from '@angular/core';

import { Map, FitBoundsOptions } from 'mapbox-gl';
import * as turf from '@turf/turf';
import { easing } from 'ts-easing';
import test from '../../assets/PointDistance/pointdist.json';


@Component({
    selector: 'app-detailed-map',
    templateUrl: './detailed-map.component.html',
    styleUrls: ['./detailed-map.component.css']
})
export class DetailedMapComponent implements AfterViewInit {
    @ViewChild('map', { static: false }) map: Map;

    studyareas: any = { "type": "FeatureCollection", "features": [] };
    burnblocks: any = { "type": "FeatureCollection", "features": [] };
    ignitions: any = { "type": "FeatureCollection", "features": [] };
    detailed;

    movingOptions: FitBoundsOptions = { padding: 30, easing: (x) => { return easing.quadratic(x) }, maxZoom: 5 };

    blurb: any;
    weightData: any[] = [];

    constructor() { }

    ngOnInit() {
        this.weightData = test;
        console.log(this.weightData);
    }


    ngAfterViewInit() {
        console.log(this.map);
        this.detailed = this.map;
    }


    boundsChange(bbox) {
        console.log(this.detailed);
        this.detailed.MapService.fitBounds(bbox);
    }

    focusOn(study) {
        console.log(study.properties.sim_name);

        this.burnblocks = '/assets/BurnBlocks/' + study.properties.sim_name + '.json';
        this.ignitions = '/assets/Ignitions/' + study.properties.sim_name + '_Ign_top1000.json';
        console.log(this.ignitions);
        this.studyareas = { "type": "FeatureCollection", "features": [study] };
    }

    onMouseMove(ev) {
        console.log(ev.lngLat);
        // let coarse = this.nearest(ev.lngLat);

        let top: Number = ev.lngLat.lat - 0.05;
        let bottom: Number = ev.lngLat.lat + 0.05;
        let left: Number = ev.lngLat.lng - 0.05;
        let right: Number = ev.lngLat.lng + 0.05;

        console.log('top: ' + top + ' left: ' + left + ' bottom: ' + bottom + ' right: ' + right);

        let d = this.weightData.filter(data => {
            return data.Lon >= left
        }).filter(data => {
            return data.Lat >= top
        }).filter(data => {
            return data.Lon <= right
        }).filter(data => {
            return data.Lat <= bottom
        });
        console.log(d);
    }

    drawWeightedLines(data) {
        // endpoints
    }

    precise(x) {
        return Number.parseFloat(x).toPrecision(5);
    }

    nearest(lngLat) {
        return { lng: this.precise(lngLat.lng), lat: this.precise(lngLat.lat) };
    }
}
