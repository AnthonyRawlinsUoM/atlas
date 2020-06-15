import { Component, OnInit } from '@angular/core';
import { DisclaimerService } from '../disclaimer.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {
  constructor(private disclaim: DisclaimerService) { }

  ngOnInit() {

  }

  alert(ev) {
    console.log(ev);
  }

  deny() {
    console.log('Declining disclaimer now...');
    this.disclaim.decline();
  }

  approve() {
    console.log('Approving disclaimer now...');
    this.disclaim.acknowledge();
  }
}
