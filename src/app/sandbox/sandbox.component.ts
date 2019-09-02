import { Component, OnInit } from '@angular/core';
import { WeightsService } from '../weights.service';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
    source;

    constructor(private ws: WeightsService) { }

    ngOnInit() {
        this.source = this.ws.getSpiderSeries('VIC', [1, 2, 3, 4, 5]);
    }

}
