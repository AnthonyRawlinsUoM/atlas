import { Component, AfterViewInit, Input } from '@angular/core';
import { CitationService } from '../citation.service';
import { HttpParameterCodec } from "@angular/common/http";

@Component({
    selector: 'app-citation-harvard',
    templateUrl: './citation-harvard.component.html',
    styleUrls: ['./citation-harvard.component.css']
})
export class CitationHarvardComponent implements AfterViewInit {

    @Input('doi') doi: string;
    constructor(private citationService: CitationService) { }
    content?: string;

    ngAfterViewInit() {
        this.citationService.getCitation(encodeURIComponent(this.doi)).subscribe(resp => {
            // display its headers
            const keys = resp.headers.keys();
            let headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
            let body = { ... resp.body };
            console.log(body);

        });

        //     .subscribe((data) => {
        //         console.log(data);
        //         this.content = data.toString();
        //     },
        // (err) => {
        //     console.warn(err);
        // },
        // () => {
        //     console.log('done GETting');
        // });
    }

}
