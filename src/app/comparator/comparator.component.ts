import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WeightsService } from '../weights.service';
import { MatrixSelectorComponent } from '../matrix-selector/matrix-selector.component';
import { BarchartComponent } from '../barchart/barchart.component';

@Component({
    selector: 'app-comparator',
    templateUrl: './comparator.component.html',
    styleUrls: ['./comparator.component.css']
})
export class ComparatorComponent implements OnInit {
    @Input() study: any;
    @ViewChild('mtx', { static: false }) mtx: MatrixSelectorComponent;
    @ViewChild('barchart', { static: false }) chart: BarchartComponent;

    selectedItems: any = [];
    scope;


    constructor(private ws: WeightsService) { }

    ngOnInit() {
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
        if (this.chart != undefined) {
            this.chart.positions = this.selectedItems;

            this.mtx.renew();
            this.chart.refresh();
        }
    }

    onScopeChange(ev) {
        console.log('Scope changed!');
        console.log(ev);

        this.scope = ev;
        this.chart.scope = this.scope;
        this.mtx.renew();
        if (this.chart != undefined) {
            // this.chart.area = this.study.properties.sim_name;
            // this.chart.positions = this.selectedItems;
            this.chart.refresh();
        }
    }
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}
