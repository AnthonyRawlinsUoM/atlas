import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IMedia, PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  @ViewChild(PlayerComponent, {static: false}) player;

  topics:Array<IMedia> = [
    {title: 'Introduction', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'},
    {title: 'Study Regions', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'},
    {title: 'Using the Map View', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'},
    {title: 'Overview of Comparators', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'},
    {title: 'Comparing Treatments', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'},
    {title: 'Understanding the Metrics', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'},
    {title: 'Interpretting the Results', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'},
    {title: 'The Effects of Climate Change', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'},
    {title: 'Comparing Costs', runtime: '1:53', src: '/assets/videos/raw_source.mp4', type: 'video/mp4'}
  ]

  constructor() { }

  ngOnInit() {
  }

  play(topic, index) {
    // console.log('Clicked video topic: ' + topic.title);
    this.player.onClickPlaylistItem(topic, index);
  }
}
