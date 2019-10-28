import { Component, OnInit, Input } from '@angular/core';
import { TeamMember } from '../team.service';

@Component({
  selector: 'app-teammember',
  templateUrl: './teammember.component.html',
  styleUrls: ['./teammember.component.css']
})
export class TeamMemberComponent implements OnInit {

  @Input() teammember: any;

  constructor() { }

  ngOnInit() {
      console.log(this.teammember);
  }

}
