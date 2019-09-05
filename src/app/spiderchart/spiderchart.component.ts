import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
    @Input() area = 'VIC';
    @Input() xAxis: any = {
        dataField: 'metric',
        displayText: 'Metric',
        valuesOnTicks: false,
        labels: { autoRotate: false }
    };

    @Output() chartType: EventEmitter<any> = new EventEmitter<any>();

    chartInstance;

    opacity = 0.23;
    lineWidth = 1.13;
    radii = 1.2;

    dataAdapter: any;
    padding: any;
    titlePadding: any;

    valueAxis: any;

    seriesGroups: any;
    selected_type: string = 'line';
    seriesList: string[] = ['line', 'stackedline', 'splinearea', 'spline', 'column', 'scatter', 'stackedcolumn', 'stackedsplinearea', 'stackedspline'];

    series = [];
    colorchart = [];

    sub;

    ngOnInit(): void {

        this.valueAxis = {
            unitInterval: 0.25,
            minValue: 0,
            maxValue: 1,
            valuesOnTicks: true
        };

        this.padding = { left: 5, top: 5, right: 5, bottom: 5 };
        this.titlePadding = { left: 0, top: 5, right: 0, bottom: 5 };

        this.sub = this.ws.getSpiderSeries(this.area, this.positions).subscribe((data) => {
            // console.log('Got subscription data for Spider Chart');
            // console.log(data);
            this.source = data;
        });

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
                // lineColor: this.colorchart[p],
                // fillColor: this.colorchart[p]
            });
        }

        this.seriesGroups =
            [
                {
                    polar: true,
                    radius: 100,
                    startAngle: 0,
                    endAngle: 360,
                    type: this.selected_type,
                    series: this.series
                }
            ];

        this.chartInstance = this.myChart;

        // console.log(this.colorchart);
    }

    onChartTypeChange(t) {
        this.selected_type = t;
        this.chartType.emit(this.selected_type);
        this.refresh();
    }

    refresh() {
        // console.log('Updating Spider Chart!');

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


        this.sub = this.ws.getSpiderSeries(this.area, this.positions).subscribe((data) => {
            // console.log('Got subscription data for Spider Chart');
            // console.log(data);
            this.source = data;

            this.seriesGroups =
                [
                    {
                        polar: true,
                        radius: 100,
                        startAngle: 0,
                        endAngle: 360,
                        type: this.selected_type,
                        series: this.series
                    }
                ];

            this.myChart.update();
        });
        this.myChart.update();
    }


    constructor(private ws: WeightsService) { }

}
