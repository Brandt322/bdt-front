import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { CustomValidators } from '../../Validations/CustomValidators';

@Component({
  selector: 'app-feedback-modal-form',
  template: ` <app-base-modal-form
    [id]="modal_id"
    title="Agrega un nuevo feedback"
    description="Añade un puntaje y escribe un comentario."
  >
    <form [formGroup]="feedbackForm">
      <div class="grid gap-4 mb-8">
        <div class="flex items-center justify-start">
          <app-rating
            [maxRating]="5"
            [ngClass]="'flex items-center'"
            formControlName="numberOfStars"
          ></app-rating>
        </div>
        <div
          class="grid gap-2 leading-tight"
          *ngIf="
            feedbackForm.get('numberOfStars')?.touched &&
            feedbackForm.get('numberOfStars')?.errors
          "
        >
          <span
            class="font-medium text-orange-500 leading-tight"
            *ngIf="feedbackForm.get('numberOfStars')?.errors?.['required']"
          >
            Es requerido que seleccione el rating.
          </span>
        </div>
        <app-textarea-select
          [variant]="'modal'"
          [label]="'Feedback'"
          [placeholder]="'Ingresa el feedback'"
          formControlName="description"
        ></app-textarea-select>
        <div
          class="grid gap-2 leading-tight"
          *ngIf="
            feedbackForm.get('description')?.touched &&
            feedbackForm.get('description')?.errors
          "
        >
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="feedbackForm.get('description')?.errors?.['required']"
          >
            El campo de descripción es requerido.
          </span>
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="feedbackForm.get('description')?.errors?.['minLength']"
          >
            El campo de descripción debe tener al menos 10 caracteres.
          </span>
        </div>
      </div>
      <app-cancel-save-buttons
        [form]="feedbackForm"
        [modal_id]="modal_id"
        [save_button_id]="'save-feedback'"
        (cancelClicked)="cancelForm()"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class FeedbackModalFormComponent implements OnInit {
  modal_id: string = 'feedback-modal-form';
  title!: string;
  description!: string;
  feedbackForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private talentDetailService: TalentDetailService
  ) { }

  ngOnInit(): void {
    this.formBuild();
  }

  cancelForm() {
    this.feedbackForm.reset();
  }

  formBuild() {
    this.feedbackForm = this.formBuilder.group({
      description: ['', [CustomValidators.required, CustomValidators.minLength(10)]],
      numberOfStars: [null, [CustomValidators.required]],
    });
  }

  onSubmit() { }
}
