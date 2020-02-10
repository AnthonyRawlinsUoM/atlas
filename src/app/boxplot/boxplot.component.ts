import { Component, OnInit, OnChanges, ElementRef, SimpleChanges, Input, Output, NgZone } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import 'chartjs-chart-box-and-violin-plot';

@Component({
  selector: 'app-boxplot',
  templateUrl: './boxplot.component.html',
  styleUrls: ['./boxplot.component.css']
})
export class BoxplotComponent implements OnInit {

  @Input() source: ChartData;

  private chart: Chart;

  private readonly boxPlotData: ChartData = {
    labels: ['A', 'B', 'C'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: 'steelblue',
      data: <any[]>[
        Array.from({length: 100}).map(() => Math.random()),
        Array.from({length: 100}).map(() => Math.random() * 0.6 + 0.2),
        Array.from({length: 100}).map(() => Math.random())
      ]
    }]
  };

  constructor(private readonly elementRef: ElementRef, private readonly ngZone: NgZone) { }

  ngOnChanges(changes: SimpleChanges) {
      if (!this.chart) {
        return;
      }

      // TODO handle updates

      this.chart.update();
    }

    ngOnInit() {
      this.build();
    }

    private build() {
      this.ngZone.runOutsideAngular(() => {
        const node: HTMLElement = this.elementRef.nativeElement;
        this.chart = new Chart(node.querySelector('canvas'), {
          type: 'boxplot',
          data: this.boxPlotData
        });
      });
    }

}
