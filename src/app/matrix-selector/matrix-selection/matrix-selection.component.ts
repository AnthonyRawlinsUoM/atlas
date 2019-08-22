import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-matrix-selection',
    templateUrl: './matrix-selection.component.html',
    styleUrls: ['./matrix-selection.component.css']
})
export class MatrixSelectionComponent implements OnInit {

    @Input() selectedItemList: any[];

    constructor() { }

    ngOnInit() {
    }

}
