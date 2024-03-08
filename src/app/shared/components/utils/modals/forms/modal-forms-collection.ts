import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-forms-collection',
  template: `
    <app-new-profile-pic-modal-form></app-new-profile-pic-modal-form>
    <app-salary-band-modal-form></app-salary-band-modal-form>
    <app-socials-modal-form></app-socials-modal-form>
    <app-technical-skills-modal-form></app-technical-skills-modal-form>
    <app-soft-skills-modal-form></app-soft-skills-modal-form>
    <app-new-file-modal-form></app-new-file-modal-form>
    <app-language-modal-form></app-language-modal-form>
    <app-feedback-modal-form></app-feedback-modal-form>
    <app-description-modal-form></app-description-modal-form>
    <app-add-work-experiences-form></app-add-work-experiences-form>
    <app-add-educational-experiences-form></app-add-educational-experiences-form>
    <app-edit-educational-experiences-form></app-edit-educational-experiences-form>
  `,
})
export class ModalFormsCollection { }
