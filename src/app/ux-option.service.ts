import { Injectable, OnInit } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UxOptionService {
  hints;

  constructor(private cookieJar: CookieService) {
    if (!this.cookieJar.check('PBA_ux_hints')) {
      this.persist();
    }
   }

   ngOnInit(): void {
     this.hints = this.getHints();
   }

    setHints(req) {
        this.hints = (req) ? 'TRUE' : 'FALSE';
        this.persist();
    }

    getHints() {
      return (this.cookieJar.get('PBA_ux_hints') === 'TRUE');
    }

    persist() {
      this.cookieJar.set('PBA_ux_hints', this.hints);
      // console.log('Hints:' + this.getHints());
    }
}
