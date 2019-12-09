import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
// import { OverviewComponent } from '../overview/overview.component';
import { MapviewComponent } from '../mapview/mapview.component';
import { StudyAreaWindowComponent } from '../study-area-window/study-area-window.component';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../modal-confirm/modal-confirm.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { FeatureCollection, Feature, Geometry } from 'geojson';
import { Base64 } from 'js-base64';
import studyareas from '../../assets/studyareas.json';
import { filter, map } from 'rxjs/operators';
import { Shortcut } from '../shortcuts/shortcuts.component';
import { InformationComponent } from '../information/information.component';

@Component({
    selector: 'app-study-areas',
    templateUrl: './study-areas.component.html',
    styleUrls: ['./study-areas.component.css']
})
export class StudyAreasComponent implements AfterViewInit {

    // @ViewChild('overview', { static: false }) overview !: OverviewComponent;
    @ViewChild('mapview', { static: false }) mapview !: MapviewComponent;
    @ViewChild('summary', { static: false }) summary !: StudyAreaWindowComponent;
    @ViewChild('info', { static: false }) info !: InformationComponent;

    @ViewChild('left', { read: ElementRef, static: false }) left: ElementRef;
    @ViewChild('right', { read: ElementRef, static: false }) right: ElementRef;

    study: any;
    focus;
    focusOn;
    studyareas;

    leftIsPip = false;
    rightIsPip = false;
    sidebarIsOpen = false;

    private fragment: Shortcut;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private modalService: SuiModalService) {
        const tree = this.router.parseUrl(this.router.url);
        console.log(tree.fragment);
        console.log('Got fragment update!');
        try {
            this.fragment = JSON.parse(Base64.decode(tree.fragment));
            console.log(this.fragment);
        }
        catch(e) {
                console.warn(e);
        }
    }

    ngOnInit() {
        this.studyareas = '/assets/studyareas.json';

        this.focus = studyareas.features
            .filter((f) => {
                if (f.properties.sim_name == this.fragment.name) {
                    return f;
                }
            })[0];


    }

    ngAfterViewInit() {
        this.router.events.subscribe(s => {
            if (s instanceof NavigationEnd) {
                const tree = this.router.parseUrl(this.router.url);
                console.log(tree.fragment);
                console.log('Got fragment update!');
                this.fragment = JSON.parse(Base64.decode(tree.fragment));
                console.log(this.fragment);

                this.focus = studyareas.features
                    .filter((f) => {
                        if (f.properties.sim_name == this.fragment.name) {
                            return f;
                        }
                    })[0];
                this.focusOn(this.focus);
                console.log(this.fragment.bbox);
                this.onBoundsChange(this.fragment.bbox);
            };
        });

        this.focusOn = (study) => {
            console.log(study);
            if (study != undefined) {
                this.mapview.focusOn(study);
            }
        }

        if (this.focus != undefined) {
            this.focusOn(this.focus);
        }
        if (this.fragment != undefined) {
            console.log(this.fragment.bbox);
            this.onBoundsChange(this.fragment.bbox);
        }
    }





    onBoundsChange(bounds) {
        console.log('StudyController was notified of bounds change');
        console.log(bounds);
        this.mapview.onBoundsChange(bounds);
    }

    onStudyChange(study) {
        this.study = study;
        this.sidebarOpen();
        if (this.summary != undefined) {
            this.summary.refresh();
        }
        this.info.study = study;
    }

    sidebarOpen() {
        this.sidebarIsOpen = true;
    }

    sidebarClose() {
        this.sidebarIsOpen = false;
    }
}
