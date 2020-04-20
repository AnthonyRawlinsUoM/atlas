import { Output, Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Map, FitBoundsOptions, LngLatBoundsLike } from 'mapbox-gl';
import { ReactiveService } from '../reactive.service';

import * as turf from '@turf/turf';
import { easing } from 'ts-easing';
import { Base64 } from 'js-base64';


import studyareas from '../../assets/studyareas.json';
import test from '../../assets/PointDistance/pointdist.json';
import { filter, map } from 'rxjs/operators';
import { FeatureCollection, Feature, Geometry } from 'geojson';


@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {

  @ViewChild('mapview', { static: false }) mapview: Map;

  @Input() focus?: any = { "type": "FeatureCollection", "features": [] };
  @Output() hoveredStateId = null;
  @Output() selectedAreaId = null;
  @Output() selectedArea = null;
  @Output() boundsChange = new EventEmitter<any>();
  @Output() studyChange = new EventEmitter<any>();

  map: MapviewComponent;

  weightData: any[] = [];
  studyareas: any = { "type": "FeatureCollection", "features": [] };
  study_detail: any = { "type": "FeatureCollection", "features": [] };
  burnblocks: any = { "type": "FeatureCollection", "features": [] };
  ignitions: any = { "type": "FeatureCollection", "features": [] };

  movingOptions: FitBoundsOptions = { padding: 30, easing: (x) => { return easing.quadratic(x) } };

  mapviewer?;

  constructor(
    private route: ActivatedRoute,
    private reactive: ReactiveService) { }

  ngOnInit() {
      this.studyareas = '/assets/studyareas.json';
  }

  onBoundsChange(bbox:any) {}

  ngAfterViewInit() {
      console.log(this.mapview);
      this.mapviewer = this.mapview;

      this.onBoundsChange = (bbox) => {
            console.log('Map view was notified of bounds change. Attempting to move now.');
            this.mapviewer.MapService.fitBounds(bbox, this.movingOptions);
        }
  }

  mapLoaded(ev) {
    console.log(ev);
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

      this.study_detail = e.features[0];
      this.zoomToBoundingBoxOfStudy(this.study_detail);
      this.studyChange.emit(this.study_detail);
  }

  getBufferedBoundsOfPoly(poly) {
    let bbox = turf.bbox(turf.buffer(poly, 25, { units: 'kilometers' }));
    return bbox;
  }

  zoomToBoundingBoxOfStudy(study) {
    let poly = turf.polygon(study.geometry.coordinates);
    // console.log(poly);

    let bbox = this.getBufferedBoundsOfPoly(poly);
    console.log(bbox);

    // let centroid = turf.centroid(poly);
    let bounds: LngLatBoundsLike = [bbox[0], bbox[1], bbox[2], bbox[3]];

    this.boundsChange.emit(bounds);
  }

  overview(ov) {
    this.burnblocks = { "type": "FeatureCollection", "features": [] };
    this.ignitions = { "type": "FeatureCollection", "features": [] };

    this.boundsChange.emit(ov.bbox);
  }

  focusOn(study) {

      // Reset
      this.burnblocks = { "type": "FeatureCollection", "features": [] };
      this.ignitions = { "type": "FeatureCollection", "features": [] };

      // Load
      this.burnblocks = '/assets/BurnBlocks/' + study.properties.sim_name + '.json';
      this.ignitions = '/assets/Ignitions/' + study.properties.sim_name + '_Ign_top1000.json';

      this.focus = study;
      this.zoomToBoundingBoxOfStudy(study);
      this.study_detail = study;
      this.studyChange.emit(this.study_detail);
  }

  private onMouseMove(ev) {
      // console.log(ev.lngLat);
      // let coarse = this.nearest(ev.lngLat);

      let top: Number = ev.lngLat.lat - 0.05;
      let bottom: Number = ev.lngLat.lat + 0.05;
      let left: Number = ev.lngLat.lng - 0.05;
      let right: Number = ev.lngLat.lng + 0.05;

      // console.log('top: ' + top + ' left: ' + left + ' bottom: ' + bottom + ' right: ' + right);

      let d = this.weightData.filter(data => {
          return data.Lon >= left
      }).filter(data => {
          return data.Lat >= top
      }).filter(data => {
          return data.Lon <= right
      }).filter(data => {
          return data.Lat <= bottom
      });
      // console.log(d);
  }

  private where(collection, constraint) {
      return collection.filter(collectionItem =>
          Object.keys(constraint).every(key =>
              collectionItem.hasOwnProperty(key) && constraint[key] === collectionItem[key]));
  }

  private drawWeightedLines(data) {
      // endpoints
  }

  private precise(x) {
      return Number.parseFloat(x).toPrecision(5);
  }

  private nearest(lngLat) {
      return { lng: this.precise(lngLat.lng), lat: this.precise(lngLat.lat) };
  }
}
