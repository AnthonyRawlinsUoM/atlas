import { Component, Input, OnInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { MatrixSelectorComponent } from '../matrix-selector/matrix-selector.component';
import { Chart, ChartData, ChartConfiguration } from 'chart.js';
import { schemes } from '../Viridis';
import { WeightsService } from '../weights.service';


@Component({
    selector: 'app-treatment',
    templateUrl: './treatment.component.html',
    styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

    @Input() study: any;
    @ViewChild('mtx', { static: false }) mtx: MatrixSelectorComponent;

    chartOptions: ChartConfiguration;
    area;
    data;
    sub;
    chart;
    selection;
    colors = schemes[2];
    positions: any[];

    initialData: ChartData = {
        labels: ['House_loss', 'Life_loss', 'Power_loss', 'Road_loss', 'TFI_burnt', 'Fire_area'],
        datasets: [{
            label: 'idx0',
            backgroundColor: this.colors.colors[0],
            data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        },
        {
            label: 'idx1',
            backgroundColor: this.colors.colors[1],
            data: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
        },
        {
            label: 'idx2',
            backgroundColor: this.colors.colors[2],
            data: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
        },
        {
            label: 'idx3',
            backgroundColor: this.colors.colors[3],
            data: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
        },
        {
            label: 'idx4',
            backgroundColor: this.colors.colors[4],
            data: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
        },
        {
            label: 'idx5',
            backgroundColor: this.colors.colors[5],
            data: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
        }]
    };

    constructor(private ws: WeightsService) { }

    ngOnInit() {

        this.area = this.study.properties.sim_name;
        this.positions = [0,1,2,3,4,5,6];

        this.chart = new Chart('radar', {
            type: 'radar',
            data:this.massage(this.initialData),
            options: {
                legend: {
                display: false,
                position: 'bottom'
              },
              aspectRatio: 1,
              maintainAspectRatio: true,
              scale: {
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        min: 0,
                        max: 1,
                        suggestedMin: 0,
                        suggestedMax: 1
                    }
                }
              }
        });

        // this.chart.scaleService.updateScaleDefaults('linear', {
        //     ticks: {
        //         min: 0,
        //         max: 1,
        //         suggestedMin: 0,
        //         suggestedMax: 1
        //     }
        // });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.refreshCharts();
    }

    onStudyChange(study) {
        this.study = study;
        this.refresh();
            this.refreshCharts();
    }

    onSelectedItemsChange(selection) {
        // console.log(selection);

        let itms = [];
        for (let s in selection) {
            itms.push((selection[s].row * 7) + selection[s].column);
        }
        this.positions = itms.filter(distinct);
        // if (this.spider != undefined) {
        //     this.spider.area = this.study.properties.sim_name;
        //     this.spider.positions = this.selectedItems;
        //     this.spider.refresh();
        // }

            this.refreshCharts();
    }

    refreshCharts() {
        console.log('Changes!');


        if (!this.chart) {
            console.log('No chart registered');
            return;
        } else {
            this.area = this.study.properties.sim_name

            if (this.sub) this.sub.unsubscribe();
            this.sub = this.ws.getSpiderSeries(this.area, this.positions).subscribe((data) => {
                console.log(data);
                // this.chart.data.datasets[0].data = [data[0]];
                // this.chart.data.datasets[1].data = [data[1]];
                // this.chart.data.datasets[2].data = [data[2]];
                // this.chart.data.datasets[3].data = [data[3]];
                // this.chart.data.datasets[4].data = [data[4]];
                // this.chart.data.datasets[5].data = [data[5]];
                // this.chart.data.datasets[6].data = [data[6]];
                this.chart.data = this.massage(this.initialData);

            });
            this.chart.update({
                duration: 450,
                easing: 'linear'
            });
        }
    }

    refresh() {
        console.log('REFRESHING!');
        this.mtx.study_area = this.study;
        this.mtx.renew();
        this.refreshCharts();
    }

    massage(data) {
        let d = [];

        for (let i of Array(this.positions.length).keys()) {
            d.push({
                label: 'idx' + i,
                backgroundColor: this.colors.colors[1],
                data: [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
            });
        }
        let example: ChartData = {
            labels: ['House_loss', 'Life_loss', 'Power_loss', 'Road_loss', 'TFI_burnt', 'Fire_area'],
            datasets: d
        };

        return example;
    }
}
const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}
