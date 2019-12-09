import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';
import { WeightsService } from '../weights.service';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {


    @ViewChild('#myChart', { static: false }) myChart: jqxChartComponent;
    @Input() chart_title: any = 'Unnamed Chart';
    @Input() description: any = 'Description.'
    @Input() source: any[] = [];
    @Input() positions: any = [];
    @Input() area = 'VIC';
    @Input() scope: any = 'House_loss';

    @Output() chartType: EventEmitter<any> = new EventEmitter<any>();

    edgeOptions;
    landscapeOptions;

    padding: any = { left: 5, top: 5, right: 5, bottom: 5 };
    titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };

    selected_type = 'column';
    sub;
    xAxis: any;
    seriesGroups: any[];
    series = [];
    toolFn;

    chart_types = ['line', 'column'];

    constructor(private ws: WeightsService) {
        this.edgeOptions = this.ws.getEdgeOptions().map(eo => {
            return eo.name;
        });
        console.log(this.edgeOptions);
        this.landscapeOptions = this.ws.getLandscapeOptions().map(eo => {
            return eo.name;
        });

        this.xAxis =
            {
                dataField: 'metric',
                gridLines: { visible: true },
                valuesOnTicks: false
            };

        this.sub = this.ws.getSingleSeries(this.area, this.positions, this.scope).subscribe((data) => {
            // console.log('Got subscription data for Spider Chart');
            console.log(data);
            this.source = data;
            this.myChart.update();
        });

        this.toolFn = (p:number): string => {
            return this.ws.getRowColumnForIndex(p);
        };

        this.series = [];
        for (let p in Array.from(Array(49).keys())) {
            this.series.push({
                dataField: 'idx' + p,
                displayText: this.toolFn(p)
            });
        }

        this.seriesGroups = [
            {
                type: 'column',
                columnsGapPercent: 0,
                seriesGapPercent: 0,
                columnsMaxWidth: 40,
                columnsMinWidth: 1,
                valueAxis:
                {
                    visible: true,
                    unitInterval: 0.1,
                    title: { text: 'Normalised ' + this.scope + ' values<br>' }
                },
                series: this.series
            }];
    }

    ngOnInit() {
    }

    onChartTypeChange(t) {
        this.selected_type = t;
        this.chartType.emit(this.selected_type);
        this.refresh();
    }

    refresh() {

        console.log(this.area);
        console.log(this.positions);
        console.log(this.scope);

        this.sub = this.ws.getSingleSeries(this.area, this.positions, this.scope).subscribe((data) => {
            // console.log('Got subscription data for Spider Chart');
            console.log(data);
            this.source = data;
            this.myChart.update();
        });
    }

}
