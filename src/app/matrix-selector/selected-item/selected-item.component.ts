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
        { name: "5", value: 4 },
        { name: "10", value: 5 },
        { name: "15", value: 6 }
    ];

    landscapeOptions = [
        { name: "0", value: 0 },
        { name: "1", value: 1 },
        { name: "2", value: 2 },
        { name: "3", value: 3 },
        { name: "5", value: 4 },
        { name: "10", value: 5 },
        { name: "15", value: 6 }
    ];

    initial;

    constructor() {
    }

    ngOnInit() {
        console.log(this.item);
        this.initial = this.deepCopy(this.item);
    }

    deepCopy(obj) {
        let copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepCopy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (let attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    changedOption(ev) {
        console.log('>> ChangedOption', ev);
        let change = {
            was: {
                row: this.initial.row,
                column: this.initial.column
            },
            now: {
                row: this.item.row,
                column: this.item.column
            }
        };

        console.log(change);
        this.change.emit(change);
    }
}
