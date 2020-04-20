import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-matrix-header-cell',
    templateUrl: './matrix-header-cell.component.html',
    styleUrls: ['./matrix-header-cell.component.css']
})
export class MatrixHeaderCellComponent implements OnInit {

    @Input() row: string = '';
    @Input() column: string = '';

    constructor() { }

    ngOnInit() {
    }

}
