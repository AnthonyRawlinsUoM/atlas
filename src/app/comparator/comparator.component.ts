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

    cc = false;


/*
https://www.chartjs.org/docs/latest/charts/bar.html

Dataset Structure Example

The data property of a dataset for a bar chart is specified as an array of numbers. Each point in the data array corresponds to the label at the same index on the x axis.

data: [20, 10]
You can also specify the dataset as x/y coordinates when using the time scale.

data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]


You can also specify the dataset for a bar chart as arrays of two numbers. This will force rendering of bars with gaps between them (floating-bars). First and second numbers in array will correspond the start and the end point of a bar respectively.

data: [[5,6], [-3,-6]]

*/
    initialData: ChartData = {

        labels: ['PB 0', 'PB 1', 'PB 2', 'PB 3', 'PB 5', 'PB 10', 'PB 15'],

        datasets: [
          {
            label: 'Risk Reduction for Levels of Prescribed Burning',
            type: 'bar',
            backgroundColor: 'rgba(58, 83, 139,0.5)',
            data: []
          },

          {
            label: 'CC Worst',
            borderColor: 'rgba(235, 69, 28, 0.75)',
            data: [],
            type: 'line',
            fill: false,
            lineTension: 0
          },

          {
            label: 'CC Best',
            borderColor: 'rgba(52, 235, 20, 0.75)',
            data: [],
            type: 'line',
            fill: false,
            lineTension: 0
          },
          {
            label: 'No Treatment',
            borderColor: 'rgba(0,0,0,0.3)',
            borderDash: [5,5],
            data: [1.0,1.0,1.0,1.0,1.0,1.0,1.0],
            type: 'line',
            fill: false,
            lineTension: 0
          }
        ]
    };
    ccsub: any;

    constructor(private ws: WeightsService) { }

    ngOnInit() {
        this.scope = 'House_loss';
        this.treatment = 'edge';
        this.area = this.study.properties.sim_name;

        this.data = this.conform([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);

        this.chart = new Chart('canvas', {

            type: 'bar',
            data: this.data,
            options: {
                legend: {
                display: true,
                position: 'bottom'
              },
              scales: {
                xAxes: [{

                    gridLines: {
                        offsetGridLines: true
                    }
                }],
                yAxes: [{
                  position: 'left',
                  ticks: {
                      beginAtZero: true,
                      suggestedMin: 0,
                      suggestedMax: 1,
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
                this.chart.data.datasets[0].data = data;
                // this.chart.data.datasets[1].data = [data[1]];
                // this.chart.data.datasets[2].data = [data[2]];
                // this.chart.data.datasets[3].data = [data[3]];
                // this.chart.data.datasets[4].data = [data[4]];
                // this.chart.data.datasets[5].data = [data[5]];
                // this.chart.data.datasets[6].data = [data[6]];
                this.chart.update({
                    duration: 450,
                    easing: 'linear'
                });

            });

            if(this.cc) {
              if (this.ccsub) this.ccsub.unsubscribe();
              this.ccsub = this.ws.getClimateRange(this.area, this.scope, this.level, this.treatment).subscribe((data) => {
                console.log('Got Climate Change data');
                console.log(data);

                // this.chart.data.datasets[1] = this.initialData.datasets[1];
                // this.chart.data.datasets[2] = this.initialData.datasets[2];
                this.chart.data.datasets[1].data = data['plus']; // Worst CC results
                this.chart.data.datasets[2].data = data['minus']; // Best CC results

                this.chart.update({
                    duration: 450,
                    easing: 'linear'
                });
              });
            } else {
              // Hacky!
                this.chart.data.datasets[1].data = [];
                this.chart.data.datasets[2].data = [];
                this.chart.update({
                    duration: 450,
                    easing: 'linear'
                });
            }


        }
    }

    other() {
        if (this.treatment == 'edge') return 'landscape';
        if (this.treatment == 'landscape') return 'edge';
    }

    pb_label(lvl){
      return this.pb_options.stepsArray[lvl].legend;
    }

    // massage(data) {
    //     let example: ChartData = {
    //         labels: [this.other()],
    //         datasets: [{
    //             label: 'PB 0',
    //             backgroundColor: this.colors.colors[0],
    //             data: [data[0]]
    //         },
    //         {
    //             label: 'PB 1',
    //             backgroundColor: this.colors.colors[1],
    //             data: [data[1]]
    //         },
    //         {
    //             label: 'PB 2',
    //             backgroundColor: this.colors.colors[2],
    //             data: [data[2]]
    //         },
    //         {
    //             label: 'PB 3',
    //             backgroundColor: this.colors.colors[3],
    //             data: [data[3]]
    //         },
    //         {
    //             label: 'PB 5',
    //             backgroundColor: this.colors.colors[4],
    //             data: [data[4]]
    //         },
    //         {
    //             label: 'PB 10',
    //             backgroundColor: this.colors.colors[5],
    //             data: [data[5]]
    //         },
    //         {
    //             label: 'PB 15',
    //             backgroundColor: this.colors.colors[6],
    //             data: [data[6]]
    //         }]
    //     };
    //
    //     return example;
    // }

    conform(data) {
      let test = this.initialData;
      test.datasets[0].data = data;
      return test;
    }

    toggleClimateChange(ev) {
      console.log('Climate change change!' + ev);
      this.cc = ev;
      this.refreshCharts();
    }
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}
