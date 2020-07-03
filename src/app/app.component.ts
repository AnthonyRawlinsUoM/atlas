import { Component, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { ShortcutService } from './shortcut.service';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Base64 } from 'js-base64';
import { LngLat } from 'mapbox-gl';
import { routerTransition } from './router.animations';
import { version } from '../../package.json';

@Component({
    selector: 'app-root',
    animations: [routerTransition],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    links: Shortcut[] = [];
    @Output() shct: EventEmitter<Shortcut> = new EventEmitter<Shortcut>();
    private fragment: string;
    public version: string = version;

    title = 'The Prescribed Burning Atlas';

    overview: Shortcut = {
        name: 'overview', bbox: [
            134.47265625,
            -25.005972656239177,
            154.6435546875,
            -44.276671273775165
        ], centroid: new LngLat(144.558105468749972, -34.64132196500718)
    }

    routes = [
        { path: '/about', name: 'About', icon: 'book icon' },
        { path: '/team', name: 'Team', icon: 'user icon' },
        { path: '/faq', name: 'FAQ', icon: 'question icon' },
        { path: '/help', name: 'Help', icon: 'life ring icon' },
        { path: '/contact', name: 'Contact Us', icon: 'envelope icon' },
        { path: '/publications', name: 'Publications', icon: 'university icon' },
    ];

    constructor(
        private auth: AuthService,
        private s: ShortcutService,
        private route: ActivatedRoute,
        private router: Router) {

        router.events.subscribe(s => {
            if (s instanceof NavigationEnd) {
                const tree = router.parseUrl(router.url);
                console.log(`URL Fragment: ${tree.fragment}`);
            }
        });

    }

    ngOnInit() {
        this.route.fragment.subscribe(fragment => { this.fragment = fragment; });

        // On initial load, set up local auth streams
        this.auth.localAuthSetup();

        this.s.getStudyLinks().subscribe((data) => {
            data.sort((a,b) => (a.order > b.order) ? 1 : -1); // Specified sort ordering
            this.links = data;
        });
    }

    getState(outlet) {
      return outlet.activatedRouteData.state;
    }

    onClick(ev) {
        console.log(ev);
        // this.router.navigate(ev);
    }

    enc(sc) {
        return Base64.encode(JSON.stringify(sc));
    }

}
export class Shortcut {
    name;
    bbox;
    centroid;
}
