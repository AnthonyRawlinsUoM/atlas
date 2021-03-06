import { Output, Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Map, FitBoundsOptions, LngLatBoundsLike, LngLatBounds } from 'mapbox-gl';
import { ReactiveService } from '../reactive.service';
import { Chart, ChartData, ChartConfiguration } from 'chart.js';

import * as turf from '@turf/turf';
import { easing } from 'ts-easing';
import { Base64 } from 'js-base64';

import { schemes } from '../Viridis';

import studyareas from '../../assets/data/studyareas.json';

// import test from '../../assets/interpolated.json';
import { filter, map } from 'rxjs/operators';
import { FeatureCollection, Feature, Geometry } from 'geojson';
import { MapComponent } from 'ngx-mapbox-gl';


@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {

  @ViewChild('mapview', { static: false }) mapview: MapComponent;

  @Input() focus?: any = { "type": "FeatureCollection", "features": [] };
  @Output() hoveredStateId = null;
  @Output() selectedAreaId = null;
  @Output() selectedArea = null;
  @Output() boundsChange = new EventEmitter<any>();
  @Output() studyChange = new EventEmitter<any>();

  // map: MapviewComponent;

  weightData: any[] = [];
  studyareas: any = { "type": "FeatureCollection", "features": [] };
  study_detail: any = { "type": "FeatureCollection", "features": [] };
  burnblocks: any = { "type": "FeatureCollection", "features": [] };
  ignitions: any = { "type": "FeatureCollection", "features": [] };
  burnblocks_edges:any = { "type": "FeatureCollection", "features": [] };
  burnblocks_landscapes:any = { "type": "FeatureCollection", "features": [] };

  movingOptions: FitBoundsOptions = { padding: 30, easing: (x) => { return easing.quadratic(x) } };

  mapviewer?: MapComponent;

  style = "mapbox://styles/anthonyrawlinsuom/cjz27t7x1594x1cpklj1anw95/draft";

  sat = false;

  chart;
  chartOptions: ChartConfiguration;
  initialData: ChartData;

  colors = schemes[2];
  ov: any;

  bounds: LngLatBounds;


  constructor(
    private route: ActivatedRoute,
    private reactive: ReactiveService) { }

  ngOnInit() {

      this.studyareas = '../../assets/data/studyareas.json';
      this.bounds = new LngLatBounds([129.5, -43.47, 153.6, -27.45]);

      // this.initialData = {
      //     labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      //     datasets: [
      //     {
      //         label: 'Similarity',
      //         borderColor: this.colors.colors[6],
      //         lineTension: 0,
      //         fill: 0,
      //         data: [
      //           0.28374612,
      //           0.72634576,
      //           0.13454252,
      //           0.37463784,
      //           0.29367457,
      //           0.87263487
      //         ]
      //     }
      //   ]
      // };

      // this.chart = new Chart('interpolatedcanvas', {
      //     type: 'line',
      //     data: this.initialData,
      //     options: {
      //         legend: {
      //         display: false,
      //         position: 'bottom'
      //       },
      //       aspectRatio: 16/9,
      //       maintainAspectRatio: true,
      //       scales: {
      //         yAxes: [{
      //           position: 'left',
      //           ticks: {
      //               suggestedMin: 0,
      //               suggestedMax: 1,
      //               stepSize: 0.25
      //           }
      //         }]
      //       }
      //     }
      // });

  }

  onBoundsChange(bounds:LngLatBounds) {
    console.log('Moving!');
    this.bounds = bounds;
  }

  mapLoaded(ev) {
    console.log('Map loaded EVENT:')
    // console.log(ev);
    // this.mapviewer = ev;
    //
    // // this.mapview.fitBoundsOptions = this.movingOptions;
    //
    // console.log(this.mapview);
    // this.ov = turf.bbox(turf.buffer(studyareas, 25, { units: 'kilometers' }));
  }

  mousemove(e) {
      if (e.features && e.features.length > 0) {
          this.hoveredStateId = e.features[0].properties.id;
          console.log(this.hoveredStateId );
      }
  }

  mouseleave() {
      this.hoveredStateId = null;
  }

  click(e) {
      console.log(e);
      if (this.hoveredStateId) {
        console.log('Selected! ' + e.features[0]);
          this.selectedAreaId = e.features[0].properties.id;
          if(e.features[0].properties) {
            console.log('found properties');
            this.selectedArea = e.features[0].properties.sim_name;
          }
          this.study_detail = e.features[0];
          this.zoomToBoundingBoxOfStudy(this.study_detail);
          this.focusOn(this.study_detail);
          e.features[0].state = { 'hover': true };
      }
  }

  getBufferedBoundsOfPoly(poly) {
    let bbox = turf.bbox(turf.buffer(poly, 25, { units: 'kilometers' }));
    return bbox;
  }

  zoomToBoundingBoxOfStudy(study) {
    let poly = turf.polygon(study.geometry.coordinates);
    console.log(poly);
    let bbox = this.getBufferedBoundsOfPoly(poly);
    // // console.log(bbox);
    this.bounds = new LngLatBounds([bbox[0], bbox[1], bbox[2], bbox[3]]);
    this.boundsChange.emit(this.bounds);
  }

  overview(ov) {
    this.burnblocks = { "type": "FeatureCollection", "features": [] };
    this.burnblocks_edges = '';
    this.burnblocks_landscapes = '';
    this.ignitions = { "type": "FeatureCollection", "features": [] };

    this.bounds = this.bounds = new LngLatBounds([129.5, -43.47, 153.6, -27.45]);
  }

  focusOn(study) {

      // Reset
      this.ignitions = { "type": "FeatureCollection", "features": [] };

      // // // console.log(this.burnblocks);
      this.burnblocks_edges = '/assets/data/G01/spatial/' + study.properties.sim_name + '_edges.json';
      this.burnblocks_landscapes = '/assets/data/G01/spatial/' + study.properties.sim_name + '_landscapes.json';

      this.ignitions = '/assets/data/G01/spatial/ignitions/' + study.properties.sim_name + '.json';

      this.focus = study;
      this.zoomToBoundingBoxOfStudy(study);
      this.study_detail = study;
      this.studyChange.emit(this.study_detail);
  }

  // private onMouseMove(ev) {
  //     // // // console.log(ev.lngLat);
  //     // let coarse = this.nearest(ev.lngLat);
  //
  //     let top: Number = ev.lngLat.lat - 0.05;
  //     let bottom: Number = ev.lngLat.lat + 0.05;
  //     let left: Number = ev.lngLat.lng - 0.05;
  //     let right: Number = ev.lngLat.lng + 0.05;
  //
  //     // // // console.log('top: ' + top + ' left: ' + left + ' bottom: ' + bottom + ' right: ' + right);
  //
  //     let d = this.weightData.filter(data => {
  //         return data.Lon >= left
  //     }).filter(data => {
  //         return data.Lat >= top
  //     }).filter(data => {
  //         return data.Lon <= right
  //     }).filter(data => {
  //         return data.Lat <= bottom
  //     });
  //     // // // console.log(d);
  // }

  private where(collection, constraint) {
      return collection.filter(collectionItem =>
          Object.keys(constraint).every(key =>
              collectionItem.hasOwnProperty(key) && constraint[key] === collectionItem[key]));
  }

  private precise(x) {
      return Number.parseFloat(x).toPrecision(5);
  }

  private nearest(lngLat) {
      return { lng: this.precise(lngLat.lng), lat: this.precise(lngLat.lat) };
  }

  public satelliteView() {
    this.sat = !this.sat;
    if(this.sat) {
      // // console.log('Toggling Satellite View: ON');
      this.style = "mapbox://styles/mapbox/satellite-v9";
    } else {
      // // console.log('Toggling Satellite View: OFF');
      this.style = "mapbox://styles/anthonyrawlinsuom/cjz27t7x1594x1cpklj1anw95/draft";

    }
  }
}
