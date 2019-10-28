import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
    @Input() TeamMembers: any[];
    contactForm;

  constructor(
    private formBuilder: FormBuilder
  ) {

      this.contactForm = this.formBuilder.group({
          first_name: '',
          last_name: '',
          address: '',
          t_and_c: '',
          member:''
        });
     }

  ngOnInit() {
  }

  onSubmit(contactData) {
      // Process  data here



      console.warn('Your enquiry has been submitted', contactData);
      this.contactForm.reset();
    }
}
