import { Component, Input } from '@angular/core';
import { EducationalExperienceRequest } from 'src/app/shared/models/interfaces/educationalExperience.interface';

@Component({
  selector: 'app-education-modal-form',
  template: ` <app-base-modal-form
    [id]="modal_id"
    title="{{ title }}"
    description="{{ description }}"
  >
    <form>
      <div class="mb-8">
        <app-educational-experience-form [educationalExperience]="educationalExperience"></app-educational-experience-form>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save-experience'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class EducationModalFormComponent {
  @Input() modal_id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() educationalExperience!: EducationalExperienceRequest;
}
