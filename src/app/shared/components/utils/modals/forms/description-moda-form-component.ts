import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { SharedDataService } from '../../../services/shared-data-service.service';
import { CustomValidators } from '../../Validations/CustomValidators';
@Component({
  selector: 'app-description-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Edita tu descripción"
    description="Tiempo de una nueva descripción? Editala."
  >
    <form [formGroup]="descriptionForm" (ngSubmit)="update()">
      <div class="grid gap-4 mb-6">
        <app-textarea-select
          [variant]="'modal'"
          [label]="'Descripción'"
          [placeholder]="'Ingrese la descripción del talento'"
          formControlName="description"
        ></app-textarea-select>

        <div
          class="grid gap-2 leading-tight"
          *ngIf="
            descriptionForm.get('description')?.touched &&
            descriptionForm.get('description')?.errors
          "
        >
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="descriptionForm.get('description')?.errors?.['required']"
          >
            El campo de descripción es requerido.
          </span>
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="descriptionForm.get('description')?.errors?.['minLength']"
          >
            El campo de descripción debe tener al menos 10 caracteres.
          </span>
        </div>

      </div>
      <app-cancel-save-buttons
        [form]="descriptionForm"
        [modal_id]="modal_id"
        [save_button_id]="'btn-description'"
        (cancelClicked)="descriptionForm.reset()"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class DescriptionModalFormComponent implements OnInit {
  modal_id: string = 'description-modal';
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
  descriptionInfo!: string;

  descriptionForm!: FormGroup;

  constructor(
    private talentDetailService: TalentDetailService,
    private data: SharedDataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.data.currentDescription.subscribe((description) => {
      this.descriptionInfo = description;
      this.descriptionForm.get('description')?.setValue(description);
    });
  }

  buildForm() {
    this.descriptionForm = this.formBuilder.group({
      description: ['', [CustomValidators.required, CustomValidators.minLength(10)]],
    });
  }

  update() {
    if (this.descriptionForm.invalid) {
      this.descriptionForm.markAllAsTouched();
    }

    if (this.descriptionForm.valid) {
      let { description } = this.descriptionForm.value;
      description = description.trim();
      this.talentDetailService.updateDescriptionForCurrentTalent(description);
      this.descriptionForm.reset();
    }
  }
}
