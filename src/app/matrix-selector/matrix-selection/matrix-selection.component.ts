import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'app-matrix-selection',
    templateUrl: './matrix-selection.component.html',
    styleUrls: ['./matrix-selection.component.css']
})
export class MatrixSelectionComponent implements OnInit {

    @Input() selectedItemList: any[] = [];
    @Input() edges;
    @Input() landscapes;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    updateSelectedItemList(l) {
        this.selectedItemList = l;
    }

    selectionModify(ev) {
        this.change.emit(ev);
    }

}
