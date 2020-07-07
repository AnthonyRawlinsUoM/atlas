import { Component, OnInit, Input } from '@angular/core';
import { DisclaimerService } from '../disclaimer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    @Input() version: string;

  constructor(private ds: DisclaimerService) { }

  ngOnInit() {
  }

  show() {
    this.ds.decline();
  }
}
