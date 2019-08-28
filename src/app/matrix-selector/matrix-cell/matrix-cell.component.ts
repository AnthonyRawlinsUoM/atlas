import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
    selector: 'app-matrix-cell',
    templateUrl: './matrix-cell.component.html',
    styleUrls: ['./matrix-cell.component.css']
})
export class MatrixCellComponent implements OnInit {

    @Input() row: number;
    @Input() column: number;
    @Input() color: any;

    @Output() activated: EventEmitter<any> = new EventEmitter<any>();
    @Output() deactivated: EventEmitter<any> = new EventEmitter<any>();

    private active = false;

    constructor() { }

    ngOnInit() {
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
}

export class MatrixPosition {
    row: number;
    column: number;
}