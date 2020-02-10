import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WeightsService } from '../weights.service';
import { BoxplotComponent } from '../boxplot/boxplot.component';

@Component({
    selector: 'app-comparator',
    templateUrl: './comparator.component.html',
    styleUrls: ['./comparator.component.css']
})
export class ComparatorComponent implements OnInit {
    @Input() study: any;
    // @ViewChild('mtx', { static: false }) mtx: MatrixSelectorComponent;
    @ViewChild('boxplot', { static: false }) boxplot: BoxplotComponent;

    scope;
    treatment;

    constructor(private ws: WeightsService) { }

    ngOnInit() {
      this.scope = 'House_loss';
      this.treatment = 'edge';
    }

    //onStudyChange
    reload(study) {
        this.study = study;
    }

    onScopeChange(scope) {
        console.log('Scope changed!');
        console.log(scope);
          this.scope = scope;
            this.boxplot.scope = scope;
            this.boxplot.refresh();
    }

    onTreatmentChange(treatment) {
        console.log('treatment changed!');
        console.log(treatment);
        this.treatment = treatment;
          this.boxplot.treatment = treatment;
        this.boxplot.refresh();
    }
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}
