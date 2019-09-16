import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatrixSelectorComponent } from '../matrix-selector/matrix-selector.component';
import { SpiderchartComponent } from '../spiderchart/spiderchart.component';


@Component({
    selector: 'app-study-area-window',
    templateUrl: './study-area-window.component.html',
    styleUrls: ['./study-area-window.component.css']
})
export class StudyAreaWindowComponent implements OnInit {

    @Input() study: any;
    @ViewChild('mtx', { static: false }) mtx: MatrixSelectorComponent;
    @ViewChild('spider', { static: false }) spider: SpiderchartComponent;

    selectedItems: any = [];

    constructor() { }

    ngOnInit() {
    }

    reload(study) {
        this.study = study;
        // this.mtx.study_area = study;
        this.mtx.renew();
    }

    onSelectedItemsChange(selection) {
        // console.log(selection);

        let itms = [];
        for (let s in selection) {
            itms.push((selection[s].row * 7) + selection[s].column);
        }
        this.selectedItems = itms.filter(distinct);
        if (this.spider != undefined) {
            this.spider.positions = this.selectedItems;
            this.spider.refresh();
        }
    }

    refresh() {
        this.mtx.renew();
        if (this.spider != undefined) {
            this.spider.area = this.study.properties.sim_name;
            this.spider.positions = this.selectedItems;
            this.spider.refresh();
        }
    }

}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}
