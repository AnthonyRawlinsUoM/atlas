import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactRequest } from './contact-form/contact-form.component';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class MailerService {

    constructor( private socket: Socket) { }

    sendMail(msg: ContactRequest): Observable<any> {
        this.socket.emit("sendmail", msg);
        return this.socket.fromEvent("response");
    }
}
