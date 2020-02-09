import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    ViewChildren,
    QueryList,
    AfterViewInit
} from '@angular/core';

import { WeightsService } from '../weights.service';
import { MatrixCellComponent } from './matrix-cell/matrix-cell.component';



@Component({
    selector: 'app-matrix-selector',
    templateUrl: './matrix-selector.component.html',
    styleUrls: ['./matrix-selector.component.css']
})
export class MatrixSelectorComponent implements OnInit {

    @ViewChildren('mtxcell') components: QueryList<MatrixCellComponent>;

    @Input() study_area;
    @Input() scope = "House_loss";
    @Output() selectedItems: EventEmitter<any> = new EventEmitter<any>();

    private selection_matrix: boolean[][];

    edgeOptions = [];
    landscapeOptions = [];


    constructor(private matrixservice: WeightsService) { }

    ngOnInit() {
        this.edgeOptions = this.matrixservice.getEdgeOptions();
        this.landscapeOptions = this.matrixservice.getLandscapeOptions();

        this.selection_matrix = [];

        for (let e = 0; e < this.edgeOptions.length; e++) {
            // this.matrix_colors[e] = [];
            this.selection_matrix[e] = [];

            for (let l = 0; l < this.landscapeOptions.length; l++) {
                this.selection_matrix[e][l] = false;
            }
        }
    }

    ngAfterViewInit() {
        // print array of CustomComponent objects
        // console.log(this.components.toArray());
    }

    onDeactivate(position) {
        this.selection_matrix[position.row][position.column] = false;

        let o = this.components
            .filter(cmp => { return cmp.row == position.row })
            .filter(cmp => { return cmp.column == position.column })[0]

        console.log(o);
        if (o.active) {
            o.active = false;
        }

        // this.mselection.selectedItemList = this.flat();
        this.selectedItems.emit(this.flat());
    }

    onActivate(position) {
        this.selection_matrix[position.row][position.column] = true;

        let o = this.components
            .filter(cmp => { return cmp.row == position.row })
            .filter(cmp => { return cmp.column == position.column })[0]

        if (!o.active) {
            o.active = true;
        }

        // this.mselection.selectedItemList = this.flat();
        this.selectedItems.emit(this.flat());
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

    updateSelection(ev) {
        // console.log('>>> Update Selection Event: ', ev);
        this.onDeactivate(ev.was);
        this.onActivate(ev.now);
        this.renew();
    }

    public refresh(scope) {
        console.log("Doing REFRESH. ");
        this.scope = scope;
        this.renew();
    }

    public renew() {
        console.log("doing renew");
        this.components.map((c) => {
            c.scope = this.scope;
            c.area = this.study_area.properties.sim_name;
            c.refresh();
        });

    }

    clearAll() {
        this.selection_matrix = [];

        for (let e = 0; e < this.edgeOptions.length; e++) {
            // this.matrix_colors[e] = [];
            this.selection_matrix[e] = [];

            for (let l = 0; l < this.landscapeOptions.length; l++) {
                this.selection_matrix[e][l] = false;
            }
        }
        this.selectedItems.emit(this.flat());
        this.components.map(o => o.deactivate());
    }

    selectAll() {
        this.selection_matrix = [];

        for (let e = 0; e < this.edgeOptions.length; e++) {
            // this.matrix_colors[e] = [];
            this.selection_matrix[e] = [];

            for (let l = 0; l < this.landscapeOptions.length; l++) {
                this.selection_matrix[e][l] = true;
            }
        }
        this.selectedItems.emit(this.flat());
        this.components.map(o => o.activate());
    }
}
