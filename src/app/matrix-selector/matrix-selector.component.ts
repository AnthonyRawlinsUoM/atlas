import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatrixSelectionComponent } from './matrix-selection/matrix-selection.component';
import { BayesNetOutputsService } from '../bayes-net-outputs.service';


import * as colormap from 'colormap';

let colors = colormap({
    colormap: 'hot',
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

    @Input() study_area;

    @Output() selectedItems: EventEmitter<any> = new EventEmitter<any>();

    private selection_matrix: boolean[][];
    private matrix_colors: any[][];
    regimes = [0, 1, 2, 3, 5, 10, 15, -1];

    scope = "Life_loss";


    constructor(private bayes: BayesNetOutputsService) { }

    ngOnInit() {
        this.selection_matrix = [];
        this.matrix_colors = [];

        for (var i: number = this.regimes.length - 1; i > -1; i--) {
            this.selection_matrix[i] = [];
            this.matrix_colors[i] = [];

            for (var j: number = 0; j < this.regimes.length - 1; j++) {
                this.selection_matrix[i][j] = false;
                this.matrix_colors[i][j] = colors[Math.floor(Math.random() * 255)];  // Randomized for testing - dynamic from json later
            }
        }

        console.log(this.selection_matrix);
        console.log(this.matrix_colors);

        this.refresh();
    }



    deactivated(position) {

        let row = this.regimes.indexOf(position.row);
        let column = this.regimes.indexOf(position.column);

        this.selection_matrix[row][column] = false;
        console.log(this.selection_matrix);

        this.mselection.updateSelectedItemList(this.flat());
    }

    activated(position) {
        let row = this.regimes.indexOf(position.row);
        let column = this.regimes.indexOf(position.column);

        this.selection_matrix[row][column] = true;
        console.log(this.selection_matrix);
        // this.selectedItems[this.regime_id(row, column)];
        this.mselection.updateSelectedItemList(this.flat());
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
        return 'r' + row + 'c' + column;
    }

    color(row, column) {
        return this.matrix_colors[this.regimes.indexOf(row)][this.regimes.indexOf(column)];
    }

    updateSelection(ev) {
        console.log(ev);
    }

    public refresh() {
        this.bayes.loadMatrix(this.study_area).subscribe((data) => {
            console.log('Got data!!');
            console.log(data);

            for (var i: number = 0; i < this.regimes.length - 1; i++) {
                for (var j: number = 0; j < this.regimes.length - 1; j++) {
                    let color = data[i][j][this.scope]['color'];

                    if (color != undefined) {
                        this.matrix_colors[i][j] = color;
                    }
                }
            }
        });
    }

}
