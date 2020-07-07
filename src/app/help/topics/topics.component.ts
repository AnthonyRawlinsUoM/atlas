import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  topics = [
    {title: 'Introduction', runtime: '1:23'},
    {title: 'Overview of Comparators', runtime: '1:23'},
    {title: 'Comparing Treatments', runtime: '1:23'},
    {title: 'Understanding the Metrics', runtime: '1:23'},
    {title: 'Interpretting the Results', runtime: '1:23'},
    {title: 'The Effects of Climate Change', runtime: '1:23'},
    {title: 'Comparing Costs', runtime: '1:23'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
