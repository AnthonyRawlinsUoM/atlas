import { Component, OnInit } from '@angular/core';
import { UxOptionService } from '../ux-option.service';

@Component({
  selector: 'app-ux-options',
  templateUrl: './ux-options.component.html',
  styleUrls: ['./ux-options.component.css']
})
export class UxOptionsComponent implements OnInit {


  hints_required;

  constructor(private ux: UxOptionService) { }

  ngOnInit() {
    this.hints_required = this.ux.getHints();
  }

  onCheckChange(ev) {
    this.ux.setHints(ev);
  }
}
