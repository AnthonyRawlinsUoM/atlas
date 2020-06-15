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
    colors = schemes[0];
    positions: any[];
    initialData: ChartData;

    constructor(private ws: WeightsService) {
      console.log(this.colors);

      this.initialData = {
          labels: ['Fire_area', 'House_loss', 'Life_loss', 'Road_loss', 'Power_loss', 'TFI_burnt'],
          datasets: [{
              label: 'No Treatment',
              backgroundColor: this.colors.colors[0],

              borderColor: this.colors.colors[0],
              fill: false,
              data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
          }
        ]
      };
    }

    ngOnInit() {

        this.area = this.study.properties.sim_name;
        this.positions = [0,1,2,3,4,5,6];

        this.chart = new Chart('radar', {
            type: 'radar',
            data: this.initialData,
            options: {
                legend: {
                display: true,
                position: 'bottom',
                labels: {
                  fontSize: 16
                }
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
        console.log(this.initialData);

        if (!this.chart) {
            console.log('No chart registered');
            return;
        } else {
            this.area = this.study.properties.sim_name

            if (this.sub) this.sub.unsubscribe();
            this.sub = this.ws.getSpiderSeries(this.area, this.positions).subscribe((data) => {
                console.log('Treatment SpiderData came back...');
                console.log(data);

                this.chart.data = this.massage(data);
                console.log(this.chart.data);
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
            let lbl = 'idx' + this.positions[i];
            let posLabel = this.ws.getRowColumnForIndex(this.positions[i]);

            d.push({
                label: posLabel,
                backgroundColor: this.colors.colors[this.positions[i]],
                borderColor: this.colors.colors[this.positions[i]],
                fill: false,
                data: [
                  data[0][lbl],
                  data[1][lbl],
                  data[2][lbl],
                  data[3][lbl],
                  data[4][lbl],
                  data[5][lbl]
                ]
            });
        }
        let example: ChartData = {
            labels: ['Fire_area', 'House_loss', 'Life_loss', 'Road_loss', 'Power_loss', 'TFI_burnt'],
            datasets: d
        };

        return example;
    }
}
const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}

export function idxToEdgeAndLandscape(i) {
  const e = Math.floor(i / 7);
  const l = i % 7;
  return {edge: e, landscape:l};
}
