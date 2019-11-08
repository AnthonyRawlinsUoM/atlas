import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    configUrl = 'assets/team/group.json';

    constructor(private http: HttpClient) { }

    public getTeam() {
        console.log('Getting Team Metadata');
        return this.http.get<any>(this.configUrl);
    }
}

export interface TeamMember {
    title?: string;
    firstname: string;
    surname: string;
    role?: string;
    description: string;
    organisation?: string;
    avatar?: string;
    googleScholarID?: string;
    twitter?: string;
}
