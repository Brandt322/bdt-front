import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience-modal-form',
  template: ` <app-base-modal-form
    [id]="modal_id"
    title="{{ title }}"
    description="{{ description }}"
  >
    <form>
      <div class="mb-8">
        <app-work-experience-form></app-work-experience-form>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save-experience'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class ExperienceModalFormComponent {
  @Input() modal_id!: string;
  @Input() title!: string;
  @Input() description!: string;
}
