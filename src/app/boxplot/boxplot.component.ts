import { Component, OnInit, OnChanges, ElementRef, SimpleChanges, Input, Output, NgZone, ViewChild } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import 'chartjs-chart-box-and-violin-plot';
import { schemes } from '../Viridis';
import { WeightsService } from '../weights.service';

@Component({
    selector: 'app-boxplot',
    templateUrl: './boxplot.component.html',
    styleUrls: ['./boxplot.component.css']
})
export class BoxplotComponent implements OnInit {
    @ViewChild('boxplot', { static: false }) chart: Chart;
    /* See: https://github.com/datavisyn/chartjs-chart-box-and-violin-plot */

    data: ChartData;
    @Input() scope: string;
    @Input() treatment: string;
    @Input() level: number;
    @Input() study: string;

    colors = schemes[2];

    private sub;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly ngZone: NgZone,
        private ws: WeightsService) { }

    refresh() {
        console.log([this.scope, this.treatment]);
        this.sub = this.ws.getSingleSeries(this.study, this.scope, this.level, this.treatment).subscribe((data) => {
            console.log('SingleSeriesSubscription data');
            console.log(data);
        });
        this.build();
        // this.chart.update();
    }

    other() {
        if (this.treatment == 'edge') return 'landscape';
        if (this.treatment == 'landscape') return 'edge';
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('Changes!');


        if (!this.chart) {
            return;
        }

        this.sub = this.ws.getSingleSeries(this.study, this.scope, this.level, this.treatment).subscribe((data) => {
            console.log('SingleSeriesSubscription data');
            console.log(data);
        });
        // TODO handle updates
        // this.chart.update();
    }

    ngOnInit() {
        this.level = 0;

        this.sub = this.ws.getSingleSeries(this.study, this.scope, this.level, this.treatment).subscribe((data) => {
            console.log('SingleSeriesSubscription data');
            console.log(data);
        });

        this.build();

    }

    private build() {

        let example: ChartData = {
            labels: [this.other()],
            datasets: [{
                label: 'PB 0',
                backgroundColor: this.colors.colors[0],
                data: <any[]>[
                    Array.from({ length: 100 }).map(() => Math.random())
                ]
            },
            {
                label: 'PB 1',
                backgroundColor: this.colors.colors[1],
                data: <any[]>[
                    Array.from({ length: 100 }).map(() => Math.random() * 0.6 + 0.2)
                ]
            },
            {
                label: 'PB 2',
                backgroundColor: this.colors.colors[2],
                data: <any[]>[

                    Array.from({ length: 100 }).map(() => Math.random() * 0.6 + 0.2)
                ]
            },
            {
                label: 'PB 3',
                backgroundColor: this.colors.colors[3],
                data: <any[]>[

                    Array.from({ length: 100 }).map(() => Math.random() * 0.6 + 0.2)
                ]
            },
            {
                label: 'PB 5',
                backgroundColor: this.colors.colors[4],
                data: <any[]>[

                    Array.from({ length: 100 }).map(() => Math.random() * 0.6 + 0.2)
                ]
            },
            {
                label: 'PB 10',
                backgroundColor: this.colors.colors[5],
                data: <any[]>[

                    Array.from({ length: 100 }).map(() => Math.random() * 0.6 + 0.2)
                ]
            },
            {
                label: 'PB 15',
                backgroundColor: this.colors.colors[6],
                data: <any[]>[

                    Array.from({ length: 100 }).map(() => Math.random() * 0.6 + 0.2)
                ]
            }]
        };

        // this.ngZone.runOutsideAngular(() => {
        //   const node: HTMLElement = this.elementRef.nativeElement;
        //   this.chart = new Chart(node.querySelector('canvas'), {
        //     type: 'boxplot',
        //     data: example
        //   });
        // });
        this.data = example;
    }

    options = {
        legend: {
            position: "bottom"
        }
    }
}
