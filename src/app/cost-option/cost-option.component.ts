import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { WeightsService } from '../weights.service';

@Component({
  selector: 'app-cost-option',
  templateUrl: './cost-option.component.html',
  styleUrls: ['./cost-option.component.css']
})
export class CostOptionComponent implements OnInit {

    @Output() costTypeChange: EventEmitter<any> = new EventEmitter<any>();
    costType;

    costTypes = [{ name: 'Carbon Cost', value: 'Carbon_cost' },
    { name: 'Environmental', value: 'Environmental_cost' },
    { name: 'House Loss Cost', value: 'House_loss_cost' },
    { name: 'Power Loss Cost', value: 'Power_loss_cost' },
    { name: 'Life Loss Cost', value: 'Life_loss_cost' },
    { name: 'Edge Treatment Cost', value: 'Edge_cost' },
    { name: 'Landscape Treatment Cost', value: 'Landscape_cost' },
    ];

    constructor(private matrixservice: WeightsService) { }

    ngOnInit() {
        this.costType = this.costTypes[1].value;
    }

    onChange(ev) {
        this.costTypeChange.emit(this.costType);
    }

}
