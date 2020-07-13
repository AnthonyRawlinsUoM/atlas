import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { IMedia, PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  @ViewChild(PlayerComponent, {static: false}) player;

  @Input() playlist:Array<IMedia>;

  constructor() { }

  ngOnInit() {
  }

  play(topic, index) {
    // console.log('Clicked video topic: ' + topic.title);
    this.player.onClickPlaylistItem(topic, index);
  }
}
