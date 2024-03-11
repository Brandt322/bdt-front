import { Component, Input, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { CustomValidators } from '../../Validations/CustomValidators';
@Component({
  selector: 'app-soft-skills-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Agrega una nueva habilidad blanda"
  >
    <form [formGroup]="form" (ngSubmit)="addTechnicalSkillToCurrentTalent()">
      <div class="grid gap-4 mb-6">
        <app-text-input
          formControlName="skill"
          [id]="'soft-skill'"
          label="Habilidad blanda"
          placeholder="Nombre de la habilidad"
        >
        </app-text-input>
        <div
          class="grid gap-2 leading-tight"
          *ngIf="
            form.get('skill')?.touched &&
            form.get('skill')?.errors
          "
        >
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="form.get('skill')?.errors?.['required']"
          >
            El campo de skill es requerido.
          </span>
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="form.get('skill')?.errors?.['minLength']"
          >
            El campo de skill debe tener al menos 2 caracteres.
          </span>
          <span
            class="font-medium text-orange-500 leading-tight"
            *ngIf="form.get('skill')?.errors?.['stringType']"
          >
            Solo puedes ingresar letras.
          </span>
        </div>
      </div>
      <app-cancel-save-buttons
        [form]="form"
        [modal_id]="modal_id"
        [save_button_id]="'btn-socials'"
        (cancelClicked)="form.reset()"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class SoftSkillsModalFormComponent {
  modal_id: string = 'soft-skills-modal';
  @Input() id!: string;
  @Input() title!: string;

  constructor(private talentDetailService: TalentDetailService) { }


  form = new FormGroup({
    skill: new FormControl('', [CustomValidators.required, CustomValidators.minLength(2), CustomValidators.stringType()]),
  });


  addTechnicalSkillToCurrentTalent() {
    if (this.form.valid) {
      const { id, skill } = this.form.value;
      skill.trim();
      this.talentDetailService.addSoftSkillToCurrentTalent(
        id,
        skill
      );
      this.form.reset();
    }
  }
}
