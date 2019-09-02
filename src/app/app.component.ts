import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'atlas';

    routes = [
        { path: '/about', name: 'About', icon: 'book icon' },
        { path: '/team', name: 'Team', icon: 'user icon' },
        { path: '/publications', name: 'Publications', icon: 'university icon' },
        { path: '/faq', name: 'FAQ', icon: 'question icon' },
        { path: '/test', name: 'Testing Component', icon: 'bug icon' },

    ];

    constructor(private auth: AuthService) { }

    ngOnInit() {
        // On initial load, set up local auth streams
        this.auth.localAuthSetup();
    }

}
