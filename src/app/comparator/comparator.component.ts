import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { WeightsService } from '../weights.service';
import { Options } from 'ng5-slider';
import { Chart, ChartData, ChartConfiguration } from 'chart.js';
import { schemes } from '../Viridis';
// import { jqxChartComponent } from 'jqwidgets-ng/jqxchart/public_api';


@Component({
    selector: 'app-comparator',
    templateUrl: './comparator.component.html',
    styleUrls: ['./comparator.component.css']
})
export class ComparatorComponent implements OnInit {
    @Input() study: any;

    chart;
    area;
    scope;
    treatment;
    data: any;
    sub;
    colors = schemes[2];
    xAxis;
    seriesGroups;
    level: number = 0;
    pb_options: Options = {
        showTicksValues: true,
        floor: 0,
        ceil: 15,
        stepsArray: [
            { value: 0, legend: 'PB 0' },
            { value: 1, legend: 'PB 1' },
            { value: 2, legend: 'PB 2' },
            { value: 3, legend: 'PB 3' },
            { value: 4, legend: 'PB 5' },
            { value: 5, legend: 'PB 10' },
            { value: 6, legend: 'PB 15' }
        ]
    };
    chartOptions: ChartConfiguration;

    initialData: ChartData = {
        labels: ['landscape'],
        datasets: [{
            label: 'PB 0',
            backgroundColor: this.colors.colors[0],
            data: [0]
        },
        {
            label: 'PB 1',
            backgroundColor: this.colors.colors[1],
            data: [0]
        },
        {
            label: 'PB 2',
            backgroundColor: this.colors.colors[2],
            data: [0]
        },
        {
            label: 'PB 3',
            backgroundColor: this.colors.colors[3],
            data: [0]
        },
        {
            label: 'PB 5',
            backgroundColor: this.colors.colors[4],
            data: [0]
        },
        {
            label: 'PB 10',
            backgroundColor: this.colors.colors[5],
            data: [0]
        },
        {
            label: 'PB 15',
            backgroundColor: this.colors.colors[6],
            data: [0]
        }]
    };

    constructor(private ws: WeightsService) { }

    ngOnInit() {
        this.scope = 'House_loss';
        this.treatment = 'edge';
        this.area = this.study.properties.sim_name;
        this.data = this.massage([0, 0, 0, 0, 0, 0, 0]);

        // this.chartOptions = {
        //   options: {
        //       legend: {
        //       display: true,
        //       position: 'bottom'
        //     },
        //     aspectRatio: 1,
        //     maintainAspectRatio: true,
        //     scales: {
        //       yAxes: [{
        //         ticks: {
        //             beginAtZero: true,
        //             min: 0,
        //             max: 1,
        //             stepSize: 0.1
        //         }
        //       }]
        //     }
        //   }
        // };

        this.chart = new Chart('canvas', {
            type: 'bar',
            data: this.initialData,
            options: {
                legend: {
                display: true,
                position: 'bottom'
              },
              aspectRatio: 16/9,
              maintainAspectRatio: true,
              scales: {
                yAxes: [{
                  position: 'right',
                  ticks: {
                      beginAtZero: true,
                      min: 0,
                      max: 1,
                      stepSize: 0.1
                  }
                }]
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

    //onStudyChange
    reload(study) {
        this.area = study.properties.sim_name;
    }

    onScopeChange(scope) {
        console.log('Scope changed!');
        console.log(scope);
        this.scope = scope;
        this.refreshCharts();
    }

    onTreatmentChange(treatment) {
        console.log('treatment changed!');
        console.log(treatment);
        this.treatment = treatment;
        // this.boxplot.treatment = treatment;
        this.refreshCharts();
    }

    levelChange(ev) {
        console.log(ev);
        this.level = ev;
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
            this.sub = this.ws.getSingleSeries(this.area, this.scope, this.level, this.treatment).subscribe((data) => {
                console.log('Got single series.');
                console.log(data);
                this.chart.data.datasets[0].data = [data[0]];
                this.chart.data.datasets[1].data = [data[1]];
                this.chart.data.datasets[2].data = [data[2]];
                this.chart.data.datasets[3].data = [data[3]];
                this.chart.data.datasets[4].data = [data[4]];
                this.chart.data.datasets[5].data = [data[5]];
                this.chart.data.datasets[6].data = [data[6]];

            });
            this.chart.update({
                duration: 450,
                easing: 'linear'
            });
        }
    }

    other() {
        if (this.treatment == 'edge') return 'landscape';
        if (this.treatment == 'landscape') return 'edge';
    }

    pb_label(lvl){
      return this.pb_options.stepsArray[lvl].legend;
    }

    massage(data) {
        let example: ChartData = {
            labels: [this.other()],
            datasets: [{
                label: 'PB 0',
                backgroundColor: this.colors.colors[0],
                data: [data[0]]
            },
            {
                label: 'PB 1',
                backgroundColor: this.colors.colors[1],
                data: [data[1]]
            },
            {
                label: 'PB 2',
                backgroundColor: this.colors.colors[2],
                data: [data[2]]
            },
            {
                label: 'PB 3',
                backgroundColor: this.colors.colors[3],
                data: [data[3]]
            },
            {
                label: 'PB 5',
                backgroundColor: this.colors.colors[4],
                data: [data[4]]
            },
            {
                label: 'PB 10',
                backgroundColor: this.colors.colors[5],
                data: [data[5]]
            },
            {
                label: 'PB 15',
                backgroundColor: this.colors.colors[6],
                data: [data[6]]
            }]
        };

        return example;
    }
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}
