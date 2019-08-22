import { Injectable, OnInit } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DisclaimerService implements OnInit {

  acknowledged = 'UNKNOWN';

  constructor(private cookieJar: CookieService) {
    if (!this.cookieJar.check('PBA_disclaimer')) {
      this.persist();
    }
  }

  ngOnInit(): void {
    // this.store.createContainer('PBA_disclaimer_acknowledgement', StorageType.LOCAL);

    this.acknowledged = this.cookieJar.get('PBA_disclaimer');
  }

  public noticed() {
    return (this.cookieJar.get('PBA_disclaimer') === 'TRUE');
  }

  public acknowledge() {
    this.acknowledged = 'TRUE';
    this.persist();
  }

  public decline() {
    this.acknowledged = 'FALSE';
    this.persist();
  }

  private persist() {
    // Use PersistenceService to store cookie here
    this.cookieJar.set('PBA_disclaimer', this.acknowledged);
  }
}
