import { Component, OnInit, Input } from '@angular/core';

export interface Author {
  name: string;
  email?: string;
  url: string;
}

export interface Cover {
  title: string;
  image: string;
  link: string;
  description?: string;
  doi?: string;
  date?: string;
  authors?: Array<Author>
}

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  @Input() cover:Cover;
  
  constructor() { }

  ngOnInit() {
  }

}
