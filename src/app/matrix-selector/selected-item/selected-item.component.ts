import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-selected-item',
    templateUrl: './selected-item.component.html',
    styleUrls: ['./selected-item.component.css']
})
export class SelectedItemComponent implements OnInit {

    @Input() item: any;

    constructor() { }

    ngOnInit() {
    }

}
