import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { WeightsService } from '../../weights.service';

@Component({
    selector: 'app-matrix-cell',
    templateUrl: './matrix-cell.component.html',
    styleUrls: ['./matrix-cell.component.css']
})
export class MatrixCellComponent implements OnInit {

    @Input() row: number;
    @Input() column: number;
    @Input() area;
    @Input() scope;
    @Input() cmap;

    // @Input() color: any;

    @Output() activated: EventEmitter<any> = new EventEmitter<any>();
    @Output() deactivated: EventEmitter<any> = new EventEmitter<any>();

    active = false;

    color;
    edgeOptions;
    landscapeOptions;

    constructor(private ms: WeightsService) { }

    ngOnInit() {

        this.edgeOptions = this.ms.getEdgeOptions();
        this.landscapeOptions = this.ms.getLandscapeOptions();
        this.color = this.ms.getMatrixCellOptionsForAreaScope(this.row, this.column, this.area, this.scope, this.cmap, 'rgba');
    }

    toggle() {
        this.active = !this.active;
    }

    onClick(ev) {
        this.toggle();

        if (this.active) {
            console.log([this.row, this.column], ' is now activated');
            this.activated.emit({ row: this.row, column: this.column });
        } else {
            console.log([this.row, this.column], ' is now deactivated');
            this.deactivated.emit({ row: this.row, column: this.column });
        }
    }
    getColor() {
        return this.color;
    }

    public refresh() {
        this.color = this.ms.getMatrixCellOptionsForAreaScope(this.row, this.column, this.area, this.scope, this.cmap, 'rgba');
    }

}

export class MatrixPosition {
    row: number;
    column: number;
}