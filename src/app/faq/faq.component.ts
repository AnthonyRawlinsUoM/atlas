import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  @Input() faq:FAQ;

  constructor() { }

  ngOnInit() {
  }

}
export class FAQ {
    question:string;
    answer:string;
    asked_when?:any;
    asked_by?:any;
    category:string;
}
