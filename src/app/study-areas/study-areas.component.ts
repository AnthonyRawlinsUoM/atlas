import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { OverviewComponent } from '../overview/overview.component';
import { DetailedMapComponent } from '../detailed-map/detailed-map.component';
import { StudyAreaWindowComponent } from '../study-area-window/study-area-window.component';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../modal-confirm/modal-confirm.component';


@Component({
    selector: 'app-study-areas',
    templateUrl: './study-areas.component.html',
    styleUrls: ['./study-areas.component.css']
})
export class StudyAreasComponent implements AfterViewInit {

    @ViewChild('overview', { static: false }) overview !: OverviewComponent;
    @ViewChild('detail', { static: false }) detail !: DetailedMapComponent;
    @ViewChild('summary', { static: false }) summary !: StudyAreaWindowComponent;

    @ViewChild('left', { read: ElementRef, static: false }) left: ElementRef;
    @ViewChild('right', { read: ElementRef, static: false }) right: ElementRef;

    study: any;;
    leftIsPip = false;
    rightIsPip = false;
    sidebarIsOpen = false;

    constructor(private modalService: SuiModalService) { }

    ngAfterViewInit() { }

    boundsChange(bbox) {
        this.detail.boundsChange(bbox);
    }

    onStudyChange(study) {

        console.log('Study Controller was notified of change of study');
        this.study = study;
        this.detail.focusOn(this.study);

        if (!this.leftIsPip) {
            this.leftIsPip = true;
        }

        this.sidebarOpen();
        if (this.summary != undefined) {
            this.summary.refresh();
        }
    }

    sidebarOpen() {
        this.sidebarIsOpen = true;
    }

    sidebarClose() {
        this.sidebarIsOpen = false;
    }
}
