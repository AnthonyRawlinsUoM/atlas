import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WeightsService } from '../weights.service';
import { SpiderchartComponent } from '../spiderchart/spiderchart.component';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

    @ViewChild('spider', { static: false }) spider: SpiderchartComponent;
    source = [];
    @Input() positions = [];
    @Input() area = 'VIC';

    sub;

    constructor(private ws: WeightsService) { }

    ngOnInit() {
        this.sub = this.ws.getSpiderSeries(this.area, this.positions).subscribe((data) => {
            // console.log('Got subscription data for Spider Chart');
            // console.log(data);
            this.source = data;
        });
    }

    refresh() {
        this.sub = this.ws.getSpiderSeries(this.area, this.positions).subscribe((data) => {
            // console.log('Got subscription data for Spider Chart');
            // console.log(data);
            this.source = data;
            this.spider.updateSelf();
        });

    }
}
