import { Component, OnInit } from '@angular/core';
import { DisclaimerService } from '../disclaimer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

  noticed = false;

  constructor(private disclaim: DisclaimerService, private router: Router) { }

  ngOnInit() {
    this.noticed = this.disclaim.noticed();
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
    console.log('Redirecting...');
    this.router.navigate(['/']);
  }
}
