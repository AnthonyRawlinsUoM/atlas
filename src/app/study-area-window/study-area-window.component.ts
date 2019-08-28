import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatrixSelectorComponent } from '../matrix-selector/matrix-selector.component';

@Component({
    selector: 'app-study-area-window',
    templateUrl: './study-area-window.component.html',
    styleUrls: ['./study-area-window.component.css']
})
export class StudyAreaWindowComponent implements OnInit {

    @Input() study: any;
    @ViewChild('mtx', { static: false }) mtx: MatrixSelectorComponent;


    constructor() { }

    ngOnInit() {
    }

    closeThis() {
        this.study = {};
    }

    reload(study) {
        this.study = study;
        this.mtx.refresh();
    }

}
