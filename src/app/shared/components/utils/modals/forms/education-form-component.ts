import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-education-modal-form',
  template: ` <app-base-modal-form
    [id]="modal_id"
    title="{{ title }}"
    description="{{ description }}"
  >
    <form action="">
      <div class="mb-8">
        <app-educational-experience-form></app-educational-experience-form>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save-experience'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class EducationModalFormComponent {
  modal_id: string = 'education-modal-form';
  @Input() title!: string;
  @Input() description!: string;
}
