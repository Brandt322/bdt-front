import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { SharedDataService } from '../../../services/shared-data-service.service';
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
        <span
          class="font-medium text-red-500 leading-tight"
          *ngIf="
            descriptionForm.controls['description'].invalid &&
            descriptionForm.controls['description'].touched
          "
        >
          Este campo es obligatorio.
        </span>
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
      description: ['', Validators.required],
    });
  }

  update() {
    if (this.descriptionForm.valid) {
      let { description } = this.descriptionForm.value;

      this.talentDetailService.updateDescriptionForCurrentTalent(description);
      this.descriptionForm.reset();
    }
  }
}
