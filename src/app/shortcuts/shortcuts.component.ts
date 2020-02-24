import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShortcutService } from '../shortcut.service';
import { BBox } from 'geojson';
import { LngLat } from 'mapbox-gl';

@Component({
    selector: 'app-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {

    links: Shortcut[] = [];
    overview: Shortcut = {
        name: 'overview',
        link: 'Overview',
        bbox: [
            -25.005972656239177,
            134.47265625,
            -44.276671273775165,
            154.6435546875
        ], centroid: new LngLat(144.558105468749972, -34.64132196500718)
    }

    @Output() shct: EventEmitter<Shortcut> = new EventEmitter<Shortcut>();

    constructor(private s: ShortcutService) { }

    ngOnInit() {
        this.s.getStudyLinks().subscribe((data) => {
            this.links = data;
        });
    }

    onClick(ev) {
        console.log(ev);
        this.shct.emit(ev);
    }

}
export class Shortcut {
    name: string;
    link:string;
    bbox: BBox;
    centroid: LngLat;
}
