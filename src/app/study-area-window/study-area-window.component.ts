import { Component, Input, OnInit } from '@angular/core';
import { MatrixPlotComponent } from '../matrix-plot/matrix-plot.component';

@Component({
  selector: 'app-study-area-window',
  templateUrl: './study-area-window.component.html',
  styleUrls: ['./study-area-window.component.css']
})
export class StudyAreaWindowComponent implements OnInit {

  @Input() study: any;

  constructor() { }

  ngOnInit() {
  }

  closeThis() {
    this.study = {};
  }

}
