import { Component, OnInit, Input } from '@angular/core';
import { VgAPI } from 'videogular2/compiled/core';

export interface IMedia {
   title: string;
   runtime: string;
   src: string;
   type: string;
   tags: Array<string>
}


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() playlist: Array<IMedia>;

  api;
  currentIndex: any = 0;
  currentItem: IMedia;

  onClickPlaylistItem(item: IMedia, index) {
      this.currentIndex = index;
      this.currentItem = item;
  }

  constructor() { }

  ngOnInit() {
    this.currentItem = this.playlist[ this.currentIndex ];
  }

  onPlayerReady(api: VgAPI) {
       this.api = api;
       this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
           this.playVideo.bind(this)
       );
       this.api.getDefaultMedia().subscriptions.ended.subscribe(
          this.nextVideo.bind(this)
       );
   }

   playVideo() {
      this.api.play();
   }

   nextVideo() {
       this.currentIndex++;

       if (this.currentIndex === this.playlist.length) {
           this.currentIndex = 0;
       }

       this.currentItem = this.playlist[ this.currentIndex ];
   }

}
