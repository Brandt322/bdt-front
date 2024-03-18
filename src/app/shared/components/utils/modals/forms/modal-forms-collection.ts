import { Component, OnInit } from '@angular/core';
import { UserPrincipal } from 'src/app/shared/models/interfaces/user.interface';

@Component({
  selector: 'app-modal-forms-collection',
  template: `
    <div *ngIf="userDetails.roles.includes('RECLUTADOR')">
    <app-new-profile-pic-modal-form></app-new-profile-pic-modal-form>
    <app-salary-band-modal-form></app-salary-band-modal-form>
    <app-socials-modal-form></app-socials-modal-form>
    <app-technical-skills-modal-form></app-technical-skills-modal-form>
    <app-soft-skills-modal-form></app-soft-skills-modal-form>
    <app-new-file-modal-form></app-new-file-modal-form>
    <app-language-modal-form></app-language-modal-form>
    <app-feedback-modal-form></app-feedback-modal-form>
    <app-description-modal-form></app-description-modal-form>
    </div>
  `,
})
export class ModalFormsCollection implements OnInit {
  userDetails!: UserPrincipal;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (sessionStorage.getItem('user_data')) {
      const userData = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data') || '{}') : {};
      this.userDetails = userData.userPrincipal;
    }
  }
}
