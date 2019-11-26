import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CitationHarvardPipe } from '../citation-harvard.pipe';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationsComponent implements OnInit {
    dois = [{ doi: '10.1071/WF18135' },
    { doi: '10.1016/j.foreco.2018.11.009' },
    { doi: '10.1016/j.agrformet.2019.03.005' }];

    constructor(private http: HttpClient, private ref: ChangeDetectorRef) { }

    private cachedCitation: string;
    private configUrl = 'https://harvardfromdoi-45iy27o3gqvh.runkit.sh/';

    ngOnInit() {
    }

    asCitation(doi) {
        let cachedCitation = this.cachedCitation;
        let url = `${this.configUrl}?doi=${doi}`;
        console.log(url);
        this.http.get(url).subscribe(data => {
            console.log(data);
            cachedCitation = data.toString();
            this.ref.markForCheck();
        },
            err => {
                console.err(err)
            },
            () => {
                console.log('Complete');
            });

    }
}
