import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-forms-collection',
  template: `<app-new-profile-pic-modal-form></app-new-profile-pic-modal-form
    ><app-salary-band-modal-form></app-salary-band-modal-form
    ><app-socials-modal-form></app-socials-modal-form
    ><app-technical-skills-modal-form></app-technical-skills-modal-form
    ><app-new-file-modal-form></app-new-file-modal-form>`,
})
export class ModalFormsCollection {}