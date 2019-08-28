import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { WeightsService } from '../../weights.service';

@Component({
    selector: 'app-scope-option',
    templateUrl: './scope-option.component.html',
    styleUrls: ['./scope-option.component.css']
})
export class ScopeOptionComponent implements OnInit {

    @Output() scopeChange: EventEmitter<any> = new EventEmitter<any>();
    scope;

    scopes = [{ name: 'Fire Area', value: 'Fire_area' },
    { name: 'House Loss', value: 'House_loss' },
    { name: 'Life Loss', value: 'Life_loss' },
    { name: 'Power Loss', value: 'Power_loss' },
    { name: 'Road Loss', value: 'Road_loss' },
    { name: 'TFI Burnt', value: 'TFI_burnt' },
    ];

    constructor(private matrixservice: WeightsService) { }

    ngOnInit() {
    }

    onChange(ev) {
        this.scopeChange.emit(this.scope);
    }

}
