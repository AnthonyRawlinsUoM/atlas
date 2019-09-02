import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';


@Component({
    selector: 'app-spiderchart',
    templateUrl: './spiderchart.component.html',
    styleUrls: ['./spiderchart.component.css']
})
export class SpiderchartComponent implements OnInit {


    @ViewChild('myChart', { static: false }) myChart: jqxChartComponent;
    @Input() chart_title: any = 'Unnamed Chart';
    @Input() description: any = 'Description.'
    @Input() source: any[] = [
        {
            id: '0',
            Fire_area: 1725090,
            House_loss: 3136190
        },
        {
            id: '1',
            Fire_area: 925090,
            House_loss: 2136190
        },
        {
            id: '2',
            Fire_area: 425090,
            House_loss: 936190
        }
    ];

    @Input() xAxis: any = {
        dataField: 'id',
        displayText: 'Metric',
        valuesOnTicks: true,
        labels: { autoRotate: false }
    };

    chartInstance;


    dataAdapter: any;
    padding: any;
    titlePadding: any;
    valueAxis: any;
    seriesGroups: any;
    selected_type: string = 'splinearea';
    seriesList: string[] = ['splinearea', 'spline', 'column', 'scatter', 'stackedcolumn', 'stackedsplinearea', 'stackedspline'];


    ngOnInit(): void {
        this.valueAxis = { unitInterval: 1, };
        this.padding = { left: 5, top: 5, right: 5, bottom: 5 };
        this.titlePadding = { left: 0, top: 5, right: 0, bottom: 5 };
        this.seriesGroups =
            [
                {
                    spider: true,
                    radius: 275,
                    startAngle: 0,
                    endAngle: 360,
                    type: this.selected_type,
                    series: [
                        { dataField: 'House_loss', displayText: 'House Loss', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#440154", fillColor: "#440154" },
                        { dataField: 'Life_loss', displayText: 'Life Loss', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#414487", fillColor: "#414487" },
                        { dataField: 'Power_loss', displayText: 'Power Loss', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#2a788e", fillColor: "#2a788e" },
                        { dataField: 'Road_loss', displayText: 'Road Loss', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#22a884", fillColor: "#22a884" },
                        { dataField: 'Fire_area', displayText: 'Fire Area', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#7ad151", fillColor: "#7ad151" },
                        { dataField: 'TFI_burnt', displayText: 'TFI Burnt', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#fde725", fillColor: "#fde725" }

                    ]
                }
            ];

        this.chartInstance = this.myChart;
    }

    updateSelf() {
        this.seriesGroups =
            [
                {
                    spider: true,
                    radius: 275,
                    startAngle: 0,
                    endAngle: 360,
                    type: this.selected_type,
                    series: [
                        { dataField: 'House_loss', displayText: 'House Loss', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#440154", fillColor: "#440154" },
                        { dataField: 'Life_loss', displayText: 'Life Loss', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#414487", fillColor: "#414487" },
                        { dataField: 'Power_loss', displayText: 'Power Loss', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#2a788e", fillColor: "#2a788e" },
                        { dataField: 'Road_loss', displayText: 'Road Loss', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#22a884", fillColor: "#22a884" },
                        { dataField: 'Fire_area', displayText: 'Fire Area', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#7ad151", fillColor: "#7ad151" },
                        { dataField: 'TFI_burnt', displayText: 'TFI Burnt', opacity: 0.42, lineWidth: 1.24, radius: 1.2, symbolType: 'circle', lineColor: "#fde725", fillColor: "#fde725" }
                    ]
                }
            ];
        this.myChart.update();
    }


    constructor() { }

}
