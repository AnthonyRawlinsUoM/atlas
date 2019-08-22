import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})
export class ExternalApiComponent implements OnInit, OnDestroy {
  responseJson: string;
  pingSub: Subscription;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  pingApi() {
    this.pingSub = this.api.ping$().subscribe(
      res => this.responseJson = res
    );
  }

  ngOnDestroy() {
    if (this.pingSub) {
      this.pingSub.unsubscribe();
    }
  }

}