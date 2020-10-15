import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

        error?;
        error_message?;

      constructor(private auth: AuthService, private route: ActivatedRoute) {

          this.route.queryParams.subscribe(params => {
                // this.error = params['error'].toUpperCase();
                // this.error_message = params['error_description'];
            });
      }

  ngOnInit() {
    this.auth.handleAuthCallback();
  }

}
