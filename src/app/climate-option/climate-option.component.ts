import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-climate-option',
  templateUrl: './climate-option.component.html',
  styleUrls: ['./climate-option.component.css']
})
export class ClimateOptionComponent implements OnInit {
  @Output() toggleClimateChange: EventEmitter<any> = new EventEmitter<any>();
  /*
    Based on: https://codepen.io/sluger/pen/YjJKYy
  */

  constructor() { }

  ngOnInit() {
  }

  onChange(ev) {
      // console.log(ev);
      this.toggleClimateChange.emit(ev);
  }

}
