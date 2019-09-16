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
    @Input() xAxis: any;

    @Output() chartType: EventEmitter<any> = new EventEmitter<any>();

    chartInstance;

    opacity = 1.0;
    lineWidth = 1.43;
    radii = 1.2; // datapoints
    radius;  // Polar chart
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

    edgeOptions;
    landscapeOptions;
    toolFn;

    ngOnInit(): void {


        this.radius = "260";

        this.xAxis = {
            dataField: 'metric',
            displayText: 'Metric',
            valuesOnTicks: true,
            labels: {
                autoRotate: false,
                color: 'rgb(100,100,100)'
             },
            gridLines: { color: 'rgb(10,11,12)', interval: 0.25 },
            tickMarks: { color: 'rgb(13,14,15)' }
        };

        this.valueAxis = {
            unitInterval: 0.2,
            minValue: 0.0,
            maxValue: 1.0,
            valuesOnTicks: true,
            gridLines: { color: 'rgb(10,11,12)', interval: 0.25 }
        };

        this.padding = { left: 5, top: 5, right: 5, bottom: 5 };
        this.titlePadding = { left: 0, top: 5, right: 0, bottom: 5 };

        this.sub = this.ws.getSpiderSeries(this.area, this.positions).subscribe((data) => {
            // console.log('Got subscription data for Spider Chart');
            // console.log(data);
            this.source = data;
        });

        this.toolFn = (p:number): string => {
            return this.ws.getRowColumnForIndex(p);
        };

        for (let p in Array.from(Array(49).keys())) {
            this.colorchart[p] = this.ws.get1DColor(p);
        }

        for (let p in Array.from(Array(49).keys())) {
            this.series.push({
                dataField: 'idx' + p,
                displayText: this.toolFn(p),
                opacity: this.opacity,
                lineWidth: this.lineWidth,
                radius: this.radii,
                symbolType: 'circle',
                // lineColor: this.colorchart[p],
                // fillColor: this.colorchart[p]
            });
        };



        this.seriesGroups =
            [
                {
                    polar: true,
                    radius: this.radius,
                    startAngle: 0,
                    endAngle: 360,
                    type: this.selected_type,
                    series: this.series,
                    tooltipFormatFunction: this.toolFn
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
                displayText: this.toolFn(p),
                opacity: this.opacity,
                lineWidth: this.lineWidth,
                radius: this.radii,
                symbolType: 'circle',
                // lineColor: this.colorchart[p],
                // fillColor: this.colorchart[p]
            });
        }
        this.sub.unsubscribe();

        this.sub = this.ws.getSpiderSeries(this.area, this.positions).subscribe((data) => {
            // console.log('Got subscription data for Spider Chart');
            // console.log(data);
            this.source = data;

            this.seriesGroups =
                [
                    {
                        polar: true,
                        radius: this.radius,
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


    constructor(private ws: WeightsService) {
        this.edgeOptions = this.ws.getEdgeOptions().map(eo => {
            return eo.name;
        });
        console.log(this.edgeOptions);
        this.landscapeOptions = this.ws.getLandscapeOptions().map(eo => {
            return eo.name;
        });
    }

}
