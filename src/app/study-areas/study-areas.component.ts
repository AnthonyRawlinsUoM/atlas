import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { OverviewComponent } from '../overview/overview.component';
import { DetailedMapComponent } from '../detailed-map/detailed-map.component';
import { StudyAreaWindowComponent } from '../study-area-window/study-area-window.component';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../modal-confirm/modal-confirm.component';


@Component({
  selector: 'app-study-areas',
  templateUrl: './study-areas.component.html',
  styleUrls: ['./study-areas.component.css']
})
export class StudyAreasComponent implements AfterViewInit {

  @ViewChild('overview', { static: false }) overview !: OverviewComponent;
  @ViewChild('detail', { static: false }) detail !: DetailedMapComponent;
  @ViewChild('summary', { static: false }) summary !: StudyAreaWindowComponent;

  @ViewChild('left', { read: ElementRef, static: false }) left: ElementRef;
  @ViewChild('right', { read: ElementRef, static: false }) right: ElementRef;

  study: any = {};
  grown = false;


  constructor(private modalService: SuiModalService) { }

  ngAfterViewInit() {
    this.detail;
  }

  boundsChange(bbox) {
    console.log('StudyAreas was notified of bbox change: ' + bbox);
    console.log(this.detail);

    this.detail.boundsChange(bbox);
  }

  onStudyChange(study) {
    console.log('Study Controller was notified of change of study');
    console.log(study);
    this.study = study;

    this.detail.focusOn(this.study);

    // this.modalService
    //   .open(new ConfirmModal("Are you sure?", "Are you sure about accepting this?", ModalSize.Small))
    //   .onApprove(() => alert("User has accepted."))
    //   .onDeny(() => alert("User has denied."));
  }

  toggleSize() {
    this.grown = !this.grown;
    // if (this.growm) {
    //   this.left.nativeElement.className = "shrink";
    //   this.right.nativeElement.className = "grow";
    // } else {
    //   this.left.nativeElement.className = "grow";
    //   this.right.nativeElement.className = "shrink";
    // }
  }
}
