import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cost-comparator',
  templateUrl: './cost-comparator.component.html',
  styleUrls: ['./cost-comparator.component.css']
})
export class CostComparatorComponent implements OnInit {
    @Input() study: any;
  constructor() { }

  ngOnInit() {
  }

}
