import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { MatrixSelectionComponent } from './matrix-selection/matrix-selection.component';
import { WeightsService } from '../weights.service';


@Component({
    selector: 'app-matrix-selector',
    templateUrl: './matrix-selector.component.html',
    styleUrls: ['./matrix-selector.component.css']
})
export class MatrixSelectorComponent implements OnInit {

    @ViewChild('mselection', { static: false }) mselection: MatrixSelectionComponent;

    @Input() study_area;
    @Input() scope = "House_loss";
    @Output() selectedItems: EventEmitter<any> = new EventEmitter<any>();

    private selection_matrix: boolean[][];

    edgeOptions = [];
    landscapeOptions = [];
    matrix_colors: any[][];

    constructor(private matrixservice: WeightsService) { }

    ngOnInit() {
        this.edgeOptions = this.matrixservice.getEdgeOptions();
        this.landscapeOptions = this.matrixservice.getLandscapeOptions();

        this.matrix_colors = [];
        this.selection_matrix = [];

        for (let e = 0; e < this.edgeOptions.length; e++) {
            this.matrix_colors[e] = [];
            this.selection_matrix[e] = [];

            for (let l = 0; l < this.landscapeOptions.length; l++) {
                this.selection_matrix[e][l] = false;
                this.matrix_colors[e][l] = this.matrixservice.getMatrixCellOptionsForAreaScope(e, l, this.study_area.properties.sim_name, this.scope, 'viridis', 'rgba');
            }
        }
        console.log(this.matrix_colors);

    }



    deactivated(position) {

        let row = this.edgeOptions.indexOf(position.row);
        let column = this.landscapeOptions.indexOf(position.column);

        this.selection_matrix[row][column] = false;
        console.log(this.selection_matrix);
        // 
        this.mselection.updateSelectedItemList(this.flat());
    }

    activated(position) {
        let row = this.edgeOptions.indexOf(position.row);
        let column = this.landscapeOptions.indexOf(position.column);

        this.selection_matrix[row][column] = true;
        console.log(this.selection_matrix);
        // this.selectedItems[this.regime_id(row, column)];
        this.mselection.updateSelectedItemList(this.flat());
    }

    flat() {
        let flat = [];
        for (var i: number = 0; i < this.edgeOptions.length; i++) {
            for (var j: number = 0; j < this.landscapeOptions.length; j++) {
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
        return this.matrix_colors[this.edgeOptions.indexOf(row)][this.landscapeOptions.indexOf(column)];
    }

    updateSelection(ev) {
        console.log(ev);
    }

    public refresh(scope) {
        console.log(scope);
        this.scope = scope;
        console.log('Refreshing Matrix!!!');

        this.edgeOptions = this.matrixservice.getEdgeOptions();
        this.landscapeOptions = this.matrixservice.getLandscapeOptions();

        this.matrix_colors = [];
        for (let e = 0; e < this.edgeOptions.length; e++) {
            this.matrix_colors[e] = [];
            for (let l = 0; l < this.landscapeOptions.length; l++) {
                this.matrix_colors[e][l] = this.matrixservice.getMatrixCellOptionsForAreaScope(e, l, this.study_area.properties.sim_name, this.scope, 'viridis', 'rgba');
            }
        }
        console.log(this.matrix_colors);
    }
}
