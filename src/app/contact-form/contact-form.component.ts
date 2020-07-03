import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { MailerService } from '../mailer.service';
import TeamMembersData from '../../assets/team/group.json';
import { IMessage } from "ng2-semantic-ui";


@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

    @Output() success: EventEmitter<any> = new EventEmitter();

    contactForm;
    conditions;
    message_sent = false;
    postman_error = '';

    TeamMembers: any[] = TeamMembersData;

    changingValue = 0;

    constructor(
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
            member: ['', Validators.required],
            message: ['', Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1000)])
            ]
        });
    }
    // ngOnDestory() {
    //     this.disconnectSocket();
    // }
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
                this
                .postman
                .sendMail(cd)
                .subscribe((data) => {
                    console.log(data);
                    if (data.success !== undefined) {
                        if (data.success) {
                            this.message_sent = true;
                            console.warn('Your enquiry has been submitted', data.message);
                            this.success.emit(data.message);
                        }
                    }
                },
                    (err) => {
                        this.postman_error = err;
                        console.error('An error occured sending the message', err);
                    },
                    () => {
                        console.log('Message sending complete.');
                    }
                );
            }
        } else {
            console.warn('The form is invalid', contactData);
        }
    }
}

export class ContactRequest {
    first_name: string;
    last_name: string;
    message: string;
    address: string;
    member: any[];
}
