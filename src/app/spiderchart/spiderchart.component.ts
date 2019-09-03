import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';
import { WeightsService } from '../weights.service';

@Component({
    selector: 'app-spiderchart',
    templateUrl: './spiderchart.component.html',
    styleUrls: ['./spiderchart.component.css']
})
export class SpiderchartComponent implements OnInit {


    @ViewChild('myChart', { static: false }) myChart: jqxChartComponent;
    @Input() chart_title: any = 'Unnamed Chart';
    @Input() description: any = 'Description.'
    @Input() source: any[] = [];
    @Input() positions: any = [];

    @Input() xAxis: any = {
        dataField: 'metric',
        displayText: 'Metric',
        valuesOnTicks: true,
        labels: { autoRotate: false }
    };

    chartInstance;

    opacity = 0.13;
    lineWidth = 1.13;
    radii = 1.2;

    dataAdapter: any;
    padding: any;
    titlePadding: any;
    valueAxis: any;
    seriesGroups: any;
    selected_type: string = 'column';
    seriesList: string[] = ['splinearea', 'spline', 'column', 'scatter', 'stackedcolumn', 'stackedsplinearea', 'stackedspline'];

    series = [];
    colorchart = [];

    ngOnInit(): void {
        this.valueAxis = { unitInterval: 1, };
        this.padding = { left: 5, top: 5, right: 5, bottom: 5 };
        this.titlePadding = { left: 0, top: 5, right: 0, bottom: 5 };

        for (let p in Array.from(Array(49).keys())) {
            this.colorchart[p] = this.ws.get1DColor(p);
        }

        for (let p in Array.from(Array(49).keys())) {
            this.series.push({
                dataField: 'idx' + p,
                displayText: p,
                opacity: this.opacity,
                lineWidth: this.lineWidth,
                radius: this.radii,
                symbolType: 'circle',
                lineColor: this.colorchart[p],
                fillColor: this.colorchart[p]
            });
        }

        this.seriesGroups =
            [
                {
                    polar: true,
                    radius: 150,
                    startAngle: 0,
                    endAngle: 360,
                    type: this.selected_type,
                    series: this.series
                }
            ];

        this.chartInstance = this.myChart;

        console.log(this.colorchart);
    }

    updateSelf() {
        console.log('Updating Spider Chart!');
        // if (this.positions.length > 0) {
        //     this.opacity = (1 / this.positions.length);
        // }
        // 
        // this.seriesGroups =
        //     [
        //         {
        //             polar: true,
        //             radius: 150,
        //             startAngle: 0,
        //             endAngle: 360,
        //             type: this.selected_type,
        //             series: this.series
        //         }
        //     ];
        this.myChart.update();
    }


    constructor(private ws: WeightsService) { }

}
