import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  @Input() title: any;
  @Input() runtime: any;
  @Input() description: any;
  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }

}
