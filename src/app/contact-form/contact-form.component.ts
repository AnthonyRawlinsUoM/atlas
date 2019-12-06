import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { MailerService } from '../mailer.service';
import TeamMembersData from '../../assets/team/group.json';
import { IMessage } from "ng2-semantic-ui";
import { NgProgressComponent, NgProgress, NgProgressRef } from '@ngx-progressbar/core';


@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, AfterViewInit {

    @ViewChild('#progressBar', {static:false}) progressBar: NgProgressComponent;

    @ViewChild('#messageTouched', {static:false}) messageTouched: ElementRef;
    @ViewChild('#messageSent', {static:false}) messageSent: ElementRef;
    @ViewChild('#messageError', {static:false}) messageError: ElementRef;


    progressRef: NgProgressRef;

    contactForm;
    conditions;
    message_sent = false;
    tcs = "Terms and Conditions of Use";
    postman_error = '';

    TeamMembers: any[] = TeamMembersData;

    changingValue = 0;

    constructor(
        private progress: NgProgress,
        private ref: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private postman: MailerService
    ) {

        this.contactForm = this.formBuilder.group({
            first_name: ['', Validators.compose([
                Validators.required,
                Validators.pattern('[a-zA-Z ]*')
            ])
            ],
            last_name: ['', Validators.compose([
                Validators.required,
                Validators.pattern('[a-zA-Z ]*')
            ])
            ],
            address: ['', ValidatorService.emailValidator],
            terms: [false, Validators.pattern('true')],
            member: ['', Validators.required],
            message: ['', Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1000)])
            ]
        });
    }

    ngOnInit() {
        this.progressRef = this.progress.ref('progressBar');
    }

    // ngOnDestory() {
    //     this.disconnectSocket();
    // }
    //
    // disconnectSocket() {
    //     if (this.socket) this.socket.disconnect();
    //   }

    ngAfterViewInit(): void {
        this.progressBar.start();
    }

    onReset() {
        this.message_sent = false;
        this.contactForm.reset();
    }

    onSubmit(contactData) {
        let cd: ContactRequest;

        // Process  data here
        if (this.contactForm.dirty && this.contactForm.valid) {

            console.log('Form is valid, sending to postman service');

            try {
                cd = contactData;
                console.log(cd);
            } catch (e) {
                console.error(e);
            } finally {

                this.progressBar.start();
                this.postman.sendMail(cd).subscribe({
                    next(data) {
                        console.log(data);
                        if (data.success !== undefined) {
                            if (data.success) {
                                // this.dismiss(this.messageTouched);
                                this.message_sent = true;
                                console.warn('Your enquiry has been submitted', data.message);

                                this.progressBar.complete();
                            }
                        }
                    },
                    error(err) {
                        this.postman_error = err;
                        console.error('An error occured sending the message', err);
                    },
                    complete() {
                        console.log('Message sending complete.');
                    }
                });
            }
        } else {
            console.warn('The form is invalid', contactData);
        }
    }

    public dismiss(message: IMessage) {
        message.dismiss();
    }
}

export class ContactRequest {
    first_name: string;
    last_name: string;
    message: string;
    address: string;
    terms?: boolean;
    member: any[];
}
