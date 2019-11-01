import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { MailerService } from '../mailer.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
    @Input() TeamMembers: any[];
    contactForm;
    conditions;
    message_sent = false;
    tcs = "Terms and Coditions of use";
    postman_error = '';

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
            terms: [false, Validators.pattern('true')],
            member: ['', Validators.required],
            message: ['', Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1000)])
            ]
        });
    }

    ngOnInit() {
    }

    ngOnDestory() {
        this.disconnectSocket();
    }

    disconnectSocket() {
        if (this.socket) this.socket.disconnect();
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
                this.postman.sendMail(cd).subscribe({
                    next(data) {
                        console.log(data);
                },
                    error(err) {
                        this.postman_error = err;
                        console.error('An error occured sending the message', err);
                    },
                    complete() {
                        this.message_sent = true;
                        console.warn('Your enquiry has been submitted', contactData);
                    }
                });
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
    terms?: boolean;
    member: any[];
}
