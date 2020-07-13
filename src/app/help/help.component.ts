import { Component, OnInit } from '@angular/core';
import { IMedia } from './player/player.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

    helpsite:string = "https://documentation.prescribedburnatlas.science/";

    topics:Array<IMedia> = [
      {title: 'Introduction', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/video/raw_source.mp4', type: 'video/mp4', tags: [
        'Navigation',
        'Overview',
        'Browsing',
        'About',
        'Team'
      ]},
      {title: 'Study Regions', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/video/raw_source.mp4', type: 'video/mp4', tags: [
        'Selecting',
        'Choices of landscape'
      ]},
      {title: 'Using the Map View', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/video/raw_source.mp4', type: 'video/mp4', tags: [
        'Panning',
        'Zooming',
        'Re-centering'
      ]},
      {title: 'Overview of Comparators', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/video/raw_source.mp4', type: 'video/mp4', tags: [
        'Costs',
        'Risks',
        'Plot types',
        'Interpretting results'
      ]},
      {title: 'Comparing Treatments', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/video/raw_source.mp4', type: 'video/mp4', tags: [
        'Edge',
        'Landscape',
        'Reasons for regimes'
      ]},
      {title: 'Understanding the Metrics', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/video/raw_source.mp4', type: 'video/mp4', tags: [
        'How to read fire impact'
      ]},
      {title: 'Interpretting the Results', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/video/raw_source.mp4', type: 'video/mp4', tags: [
        'Interpretting results',
        'Comparing study areas'
      ]},
      {title: 'The Effects of Climate Change', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/video/raw_source.mp4', type: 'video/mp4', tags: [
        'How climate change affects the results',
        'Best case',
        'Worst case'
      ]},
      {title: 'Comparing Costs', runtime: '1:53', src: 'https://prescribedburnatlas.science/assets/videos/raw_source.mp4', type: 'video/mp4', tags: [
        'Analysis'
      ]}
    ]

  constructor() { }

  ngOnInit() {
  }

}
