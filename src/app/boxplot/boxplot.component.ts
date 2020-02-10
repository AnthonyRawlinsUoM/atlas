import { Component, OnInit, OnChanges, ElementRef, SimpleChanges, Input, Output, NgZone } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import 'chartjs-chart-box-and-violin-plot';
import { schemes } from '../Viridis';

@Component({
  selector: 'app-boxplot',
  templateUrl: './boxplot.component.html',
  styleUrls: ['./boxplot.component.css']
})
export class BoxplotComponent implements OnInit {

  /* See: https://github.com/datavisyn/chartjs-chart-box-and-violin-plot */

  @Input() source: ChartData;

  private chart: Chart;

  colors = schemes[2];

  example: ChartData = {
    labels: ['House Loss'],
    datasets: [{
      label: 'PB 0',
      backgroundColor: this.colors.colors[0],
      data: <any[]>[
        Array.from({length: 100}).map(() => Math.random())
      ]
    },
    {
      label: 'PB 1',
      backgroundColor: this.colors.colors[1],
      data: <any[]>[
        Array.from({length: 100}).map(() => Math.random() * 0.6 + 0.2)
      ]
    },
    {
      label: 'PB 2',
      backgroundColor: this.colors.colors[2],
      data: <any[]>[

          Array.from({length: 100}).map(() => Math.random() * 0.6 + 0.2)
      ]
    },
    {
      label: 'PB 3',
      backgroundColor: this.colors.colors[3],
      data: <any[]>[

          Array.from({length: 100}).map(() => Math.random() * 0.6 + 0.2)
      ]
    },
    {
      label: 'PB 5',
      backgroundColor: this.colors.colors[4],
      data: <any[]>[

          Array.from({length: 100}).map(() => Math.random() * 0.6 + 0.2)
      ]
    },
    {
      label: 'PB 10',
      backgroundColor: this.colors.colors[5],
      data: <any[]>[

          Array.from({length: 100}).map(() => Math.random() * 0.6 + 0.2)
      ]
    },
    {
      label: 'PB 15',
      backgroundColor: this.colors.colors[6],
      data: <any[]>[

          Array.from({length: 100}).map(() => Math.random() * 0.6 + 0.2)
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
          data: this.example
        });
      });
    }

}
