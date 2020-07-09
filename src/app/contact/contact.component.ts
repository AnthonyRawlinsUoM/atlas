import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    error?;
    error_message?;

  constructor(private auth: AuthService, private route: ActivatedRoute) {

      this.route.queryParams.subscribe(params => {
            this.error = params['error'].toUpperCase();
            this.error_message = params['error_description'];
        });
  }

  ngOnInit() {

  }

  onCompleted(ev) {
      // console.log(ev);
  }
}
