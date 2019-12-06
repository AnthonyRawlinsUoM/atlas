import { Component, OnInit, Input } from '@angular/core';
import { CitationService } from '../citation.service';
import { HttpParameterCodec } from "@angular/common/http";

@Component({
    selector: 'app-citation-harvard',
    templateUrl: './citation-harvard.component.html',
    styleUrls: ['./citation-harvard.component.css']
})
export class CitationHarvardComponent implements OnInit {

    @Input('doi') doi: string;
    constructor(private citationService: CitationService) { }
    content: string = '<i class="circle notch icon"></i>';

    ngOnInit() {
        this.citationService.getCitation(encodeURIComponent(this.doi))
            .subscribe(data => {
                this.content = data.toString()
            });
    }

}
