import { Component, OnInit } from '@angular/core';
import freq from '../../assets/faqs.json';
import { FAQ } from '../faq/faq.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  faqs: FAQ[];

  constructor(private auth: AuthService) {
    // console.log(freq.faqs);
    this.faqs = freq.faqs;
  }

  ngOnInit() {
  }

}
