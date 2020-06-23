import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { WeightsService } from '../weights.service';
import { Options } from 'ng5-slider';
import { Chart, ChartData, ChartConfiguration } from 'chart.js';
import { schemes } from '../Viridis';

@Component({
  selector: 'app-cost-comparator',
  templateUrl: './cost-comparator.component.html',
  styleUrls: ['./cost-comparator.component.css']
})

export class CostComparatorComponent implements OnInit {
    @Input() study: any;

    chart;
    area;
    costType;
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

    initialData: ChartData;

    constructor(private ws: WeightsService) { }

    ngOnInit() {
        this.costType = 'House_loss_cost';
        this.treatment = 'edge';
        this.area = this.study.properties.sim_name;
        this.data = this.massage([10000, 10000, 10000, 10000, 10000, 10000, 10000]);

        this.initialData = {
            labels: ['Cost'],
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
            }
          ]
        };

        this.chart = new Chart('costcanvas', {
            type: 'bar',
            data: this.initialData,
            options: {
               tooltips: {
                  callbacks: {
                        label: this.toolTipFormatter
                    }
                },
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
                      callback: this.millionsFormatter
                      // suggestedMin: 0,
                      // suggestedMax: 12000000
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

    public millionsFormatter(value, index, values) {
      return "$" + (value/1000000).toFixed(2) + "M";
    }

    public toolTipFormatter(tooltipItem, data) {
        var label = data.datasets[tooltipItem.datasetIndex].label || '';

        if (label) {
            label += ': ';
        }
        // label += Math.round(tooltipItem.yLabel * 100) / 100;
        label += "$" + (tooltipItem.yLabel/1000000).toFixed(2) + "M";
        return label;
    }

    //onStudyChange
    reload(study) {
        this.area = study.properties.sim_name;
    }

    onCostTypeChange(costType) {
        console.log('CostType changed!');
        console.log(costType);
        this.costType = costType;
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
            this.sub = this.ws.getCostSeries(this.area, this.costType, this.level, this.treatment).subscribe((data) => {
                console.log('Got cost series.');
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
