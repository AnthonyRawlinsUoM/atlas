import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatrixSelectionComponent } from '../matrix-'
import * as colormap from 'colormap';

let colors = colormap({
    colormap: 'viridis',
    nshades: 255,
    format: 'rgbaString',
    alpha: 0.5
});

@Component({
    selector: 'app-matrix-selector',
    templateUrl: './matrix-selector.component.html',
    styleUrls: ['./matrix-selector.component.css']
})
export class MatrixSelectorComponent implements OnInit {

    @ViewChild('mselection', { static: false }) mselection: MatrixSelectionComponent;

    @Output selectedItems: EventEmitter<any> = new EventEmitter<any>();

    private selection_matrix: boolean[][];
    private matrix_colors: any[][];
    private regimes = [0, 1, 2, 3, 5, 10, 15, -1];

    constructor() { }

    ngOnInit() {
        this.selection_matrix = [];
        this.matrix_colors = [];

        for (var i: number = 0; i < this.regimes.length - 1; i++) {
            this.selection_matrix[i] = [];
            this.matrix_colors[i] = [];

            for (var j: number = 0; j < this.regimes.length - 1; j++) {
                this.selection_matrix[i][j] = false;
                this.matrix_colors[i][j] = colors[Math.floor(Math.random() * 255)];  // Randomized for testing - dynamic from json later
            }
        }

        console.log(this.selection_matrix);
        console.log(this.matrix_colors);

    }

    deactivated(position) {

        let row = this.regimes.indexOf(position.row);
        let column = this.regimes.indexOf(position.column);

        this.selection_matrix[row][column] = false;
        console.log(this.selection_matrix);
    }

    activated(position) {
        let row = this.regimes.indexOf(position.row);
        let column = this.regimes.indexOf(position.column);

        this.selection_matrix[row][column] = true;
        console.log(this.selection_matrix);
        // this.selectedItems[this.regime_id(row, column)];
        this.selection.updateSelectedItemList(this.flat());
    }

    flat() {
        let flat = [];
        for (var i: number = 0; i < this.regimes.length - 1; i++) {
            for (var j: number = 0; j < this.regimes.length - 1; j++) {
                if (this.selection_matrix[i][j]) {
                    flat.push({ row: i, column: j });
                }
            }
        }
        return flat;
    }

    regime_id(row: number, column: number) {
        return 'r' + str(row) + 'c' + str(column);
    }

    color(row, column) {
        return this.matrix_colors[this.regimes.indexOf(row)][this.regimes.indexOf(column)];
    }

}
