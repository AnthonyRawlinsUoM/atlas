import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShortcutService } from '../shortcut.service';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {

  links: Shortcut[] = [];
  @Output() shct: EventEmitter<Shortcut> = new EventEmitter<Shortcut>();

  constructor(private s: ShortcutService) { }

  ngOnInit() {
    this.s.getStudyLinks().subscribe((data) => {
      this.links = data;
    });
  }

  onClick(ev) {
    console.log(ev);
    this.shct.emit(ev);
  }

}
export class Shortcut {
  name;
  bbox;
  centroid;
}
