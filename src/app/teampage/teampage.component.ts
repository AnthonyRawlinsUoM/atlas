import { Component, OnInit } from '@angular/core';
// import { TeamService, TeamMember } from '../team.service';

import TeamMembersData from '../../assets/team/group.json';

@Component({
  selector: 'app-teampage',
  templateUrl: './teampage.component.html',
  styleUrls: ['./teampage.component.css']
})
export class TeampageComponent implements OnInit {

    TeamMembers: any[] = TeamMembersData;

    constructor() { }

    ngOnInit() {
        console.log(this.TeamMembers);
    }
}
