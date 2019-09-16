import { Component, OnInit } from '@angular/core';
import freq from '../../assets/faqs.json';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  faqs: FAQ[];

  constructor() {
    console.log(freq.faqs);
    this.faqs = freq.faqs;
  }

  ngOnInit() {
  }

}
