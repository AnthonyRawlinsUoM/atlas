import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
    dois = [
        { doi: '10.1071/WF18135' },
        { doi: '10.1016/j.foreco.2018.11.009' },
        { doi: '10.1016/j.agrformet.2019.03.005' },
        { doi: '10.1016/j.jenvman.2019.01.055' }
    ];

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }
}
