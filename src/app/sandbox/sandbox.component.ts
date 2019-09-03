import { Component, Input, OnInit } from '@angular/core';
import { WeightsService } from '../weights.service';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
    source;
    @Input() positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    @Input() area = 'VIC';

    constructor(private ws: WeightsService) { }

    ngOnInit() {
        this.source = this.ws.getSpiderSeries('VIC', this.positions);
    }

    onAreaChange() {
        this.source = this.ws.getSpiderSeries(this.area, this.positions);
    }

}
