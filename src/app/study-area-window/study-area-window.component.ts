import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatrixSelectorComponent } from '../matrix-selector/matrix-selector.component';
import { SandboxComponent } from '../sandbox/sandbox.component';


@Component({
    selector: 'app-study-area-window',
    templateUrl: './study-area-window.component.html',
    styleUrls: ['./study-area-window.component.css']
})
export class StudyAreaWindowComponent implements OnInit {

    @Input() study: any;
    @ViewChild('mtx', { static: false }) mtx: MatrixSelectorComponent;
    @ViewChild('spider', { static: false }) spider: SandboxComponent;

    selectedItems: any = [];

    constructor() { }

    ngOnInit() {
    }

    closeThis() {
        this.study = {};
    }

    reload(study) {
        this.study = study;
        // this.mtx.study_area = study;
        this.mtx.renew();
    }

    onSelectedItemsChange(selection) {
        console.log(selection);

        let itms = [];
        for (let s in selection) {
            itms.push((selection[s].row * 7) + selection[s].column);
        }
        this.selectedItems = itms.filter(distinct);
        console.log();
        this.spider.refresh();
    }

}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}