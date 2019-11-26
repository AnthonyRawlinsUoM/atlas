import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'citationHarvard',
    pure: false
})
export class CitationHarvardPipe implements PipeTransform {
    private cachedCitation: string = '<div></div>';
    private cachedDoi: string = '';
    private configUrl = 'https://harvardfromdoi-45iy27o3gqvh.runkit.sh/';

    constructor(private http: HttpClient) {}

    transform(doi: string): any {
        if (doi !== this.cachedDoi) {
            this.cachedCitation = '<i class="spinner icon"></i>';
            this.cachedDoi = doi;

            let url = `${this.configUrl}?doi=${doi}`;
            console.log(url);
            this.http.get(url).subscribe(data => {
                console.log(data);
                this.cachedCitation = data.toString()
                return this.cachedCitation;
            });
    } else {
        return this.cachedCitation;
    }
    }
}
