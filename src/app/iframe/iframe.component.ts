import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SafePipe } from '../safe.pipe';

@Component({
    selector: 'app-iframe',
    templateUrl: './iframe.component.html',
    styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements AfterViewInit {
    @Input() url: string;
    @ViewChild('iframe', {static: false}) iframe: ElementRef;

    ngAfterViewInit() {
        this.iframe.nativeElement.setAttribute('src', this.url);
    }
}
