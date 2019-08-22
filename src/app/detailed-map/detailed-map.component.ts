import { Output, Component, AfterViewInit, ViewChild, EventEmitter, OnInit, Input } from '@angular/core';

import { Map, FitBoundsOptions } from 'mapbox-gl';
import * as turf from '@turf/turf';
import { easing } from 'ts-easing';

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

  constructor() { }

  ngOnInit() { }


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
}
