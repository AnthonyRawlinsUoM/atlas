import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { WeightsService } from '../../weights.service';

@Component({
    selector: 'app-matrix-cell',
    templateUrl: './matrix-cell.component.html',
    styleUrls: ['./matrix-cell.component.css']
})
export class MatrixCellComponent implements OnInit {
    @Input() id: number;
    @Input() row: number;
    @Input() column: number;
    @Input() area;
    @Input() scope;
    @Input() cmap;
    @Input() active: boolean = false;

    // @Input() color: any;

    @Output() activated: EventEmitter<any> = new EventEmitter<any>();
    @Output() deactivated: EventEmitter<any> = new EventEmitter<any>();

    idx;
    color;
    edgeOptions;
    landscapeOptions;

    constructor(private ms: WeightsService) { }

    ngOnInit() {
        this.color = this.ms.getMatrixCellOptionsForAreaScope(this.id, this.area, this.scope, this.cmap, 'rgba');
        this.idx = this.id;
    }

    toggle() {
        this.active = !this.active;
    }

    public deactivate() {
        this.active = false;
    }

    public activate() {
        this.active = true;
    }

    onClick(ev) {
        this.toggle();

        if (this.active) {
            // console.log([this.row, this.column], ' is now activated');
            this.activated.emit({ row: this.row, column: this.column });
        } else {
            // console.log([this.row, this.column], ' is now deactivated');
            this.deactivated.emit({ row: this.row, column: this.column });
        }
    }
    getColor() {
        return this.color;
    }

    public refresh() {
        this.color = this.ms.getMatrixCellOptionsForAreaScope(this.id, this.area, this.scope, this.cmap, 'rgba');
    }

}

export class MatrixPosition {
    row: number;
    column: number;
}
