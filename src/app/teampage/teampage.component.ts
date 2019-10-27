import { Component, OnInit } from '@angular/core';
import { TeamService, TeamMember } from '../team.service';

@Component({
  selector: 'app-teampage',
  templateUrl: './teampage.component.html',
  styleUrls: ['./teampage.component.css']
})
export class TeampageComponent implements OnInit {

    team: TeamMember[] = [];

    constructor(private teamservice: TeamService) { }

    ngOnInit() {
        this.teamservice.getTeam().subscribe((data: TeamMember[]) => {
            console.log(data);
            this.team = data;
        });
    }
}
