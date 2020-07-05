import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { WeightsService } from '../weights.service';
import { Options } from 'ng5-slider';
import { Chart, ChartData, ChartConfiguration } from 'chart.js';
import { schemes } from '../Viridis';
import { CostTypes } from '../cost-option/cost-option.component';

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
        this.costType = 'total_cost';

        this.treatment = 'edge';

        this.area = this.study.properties.sim_name;
        this.data = [];
        //this.massage([10000, 10000, 10000, 10000, 10000, 10000, 10000]);


//    { name: 'Environmental Costs', value: 'Environmental_cost' },
//    { name: 'House Loss Costs', value: 'House_loss_cost' },
//    { name: 'Power Loss Costs', value: 'Power_loss_cost' },
//    { name: 'Life Loss Costs', value: 'Life_loss_cost' },
//    { name: 'Edge Treatment Costs', value: 'Edge_cost' },
//    { name: 'Landscape Treatment Costs', value: 'Landscape_cost' },


        this.initialData = {
            labels: [
              'PB 0',
              'PB 1',
              'PB 2',
              'PB 3',
              'PB 5',
              'PB 10',
              'PB 15'
            ],
            datasets: [
            {
                label: CostTypes[1].name,
                backgroundColor: this.colors.colors[1],
                data: [10000, 10000, 10000, 10000, 10000, 10000, 10000]
            },
            {
                label: CostTypes[2].name,
                backgroundColor: this.colors.colors[2],
                data: [10000, 10000, 10000, 10000, 10000, 10000, 10000]
            },
            {
                label: CostTypes[3].name,
                backgroundColor: this.colors.colors[3],
                data: [10000, 10000, 10000, 10000, 10000, 10000, 10000]
            },
            {
                label: CostTypes[4].name,
                backgroundColor: this.colors.colors[4],
                data: [10000, 10000, 10000, 10000, 10000, 10000, 10000]
            },
            {
                label: CostTypes[5].name,
                backgroundColor: this.colors.colors[5],
                data: [10000, 10000, 10000, 10000, 10000, 10000, 10000]
            },
            {
                label: CostTypes[6].name,
                backgroundColor: this.colors.colors[6],
                data: [10000, 10000, 10000, 10000, 10000, 10000, 10000]
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
                position: 'bottom',
                align: 'start',
                labels: {
                  boxWidth: 16
                }
              },
              aspectRatio: 16/9,
              maintainAspectRatio: true,
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  position: 'left',
                  stacked: true,
                  ticks: {
                      callback: this.millionsFormatter,
                      suggestedMin: 0,
                      // suggestedMax: 12000000
                  }
                }]
              }
            }
        });
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
            this.area = this.study.properties.sim_name;
            if (this.sub) this.sub.unsubscribe();

            // Stacked Chart for Totals only
            if (this.costType == 'total_cost') {
              //Build from all other sets
              console.log('Building stacked bars');
              this.chart.options.scales.yAxes[0].stacked = true;

              CostTypes.map(ct => {
                this.ws.getCostSeries(this.area, ct.value, this.level, this.treatment).subscribe((data) => {
                  console.log('Got cost series for: ' + ct.value);
                  console.log(data);

                  this.chart.data.datasets.map(d => {
                    if(d.label === this.titleCase(ct.value)) {
                      console.log('Activating: ' + ct.value);
                      d.data = [
                        data[0],
                        data[1],
                        data[2],
                        data[3],
                        data[4],
                        data[5],
                        data[6]
                      ];
                    } else {
                      console.log(d.label);
                    }
                  });
              })
            });


            } else {

              this.sub = this.ws.getCostSeries(this.area, this.costType, this.level, this.treatment).subscribe((data) => {
                  console.log('Got cost series for: ' + this.costType);
                  console.log(data);
                  this.chart.data.datasets.map(d => {
                    if(d.label === this.titleCase(this.costType)) {
                      console.log('Activating: ' + this.costType);
                      d.data = [
                        data[0],
                        data[1],
                        data[2],
                        data[3],
                        data[4],
                        data[5],
                        data[6]
                      ];
                    } else {
                      console.log('De-activate this dataset: ' + d.label);
                      d.data = [0,0,0,0,0,0,0,];
                    }
                  });
              });
              this.chart.options.scales.yAxes[0].stacked = true;

            }
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


    public longName(costType) {
      CostTypes.map(o => {
        if (o.value == costType) {
          return this.titleCase(o.name);
        }
      });
    }

    // A quick helper function from...
    // https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
    public titleCase(str) {
      return str.toLowerCase().split('_').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
      }).join(' ');
    }
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}
