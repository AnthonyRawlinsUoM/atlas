import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-selected-item',
    templateUrl: './selected-item.component.html',
    styleUrls: ['./selected-item.component.css']
})
export class SelectedItemComponent implements OnInit {

    @Input() item: any;
    @Input() regimes: any;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    edgeOptions = [
        { name: "0", value: 0 },
        { name: "1", value: 1 },
        { name: "2", value: 2 },
        { name: "3", value: 3 },
        { name: "5", value: 5 },
        { name: "10", value: 10 },
        { name: "15", value: 15 }
    ];

    landscapeOptions = [
        { name: "0", value: 0 },
        { name: "1", value: 1 },
        { name: "2", value: 2 },
        { name: "3", value: 3 },
        { name: "5", value: 5 },
        { name: "10", value: 10 },
        { name: "15", value: 15 }
    ];

    constructor() {
    }

    ngOnInit() {
    }

    changedEdge(ev) {
        console.log(ev);
        this.change.emit({});
    }

    changedLandscape(ev) {
        console.log(ev);
        this.change.emit({});
    }
}
