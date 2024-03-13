import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { CustomValidators } from '../../Validations/CustomValidators';

@Component({
  selector: 'app-technical-skills-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Agrega una nueva habilidad técnica"
  >
    <form [formGroup]="form" (ngSubmit)="addTechnicalSkillToCurrentTalent()">
      <div class="grid gap-4 mb-6">
        <app-text-input
          formControlName="skill"
          [id]="'technical-skill'"
          label="Habilidad técnica"
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
            *ngIf="form.get('skill')?.errors?.['stringWithPunctuationValidator']"
          >
            No se aceptan numeros.
          </span>
        </div>
        <app-text-input
          formControlName="years"
          [id]="'link-github'"
          label="Años de experiencia"
          placeholder="Nro. de años"
        >
        </app-text-input>
        <div
          class="grid gap-2 leading-tight"
          *ngIf="
            form.get('years')?.touched &&
            form.get('years')?.errors
          "
        >
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="form.get('years')?.errors?.['required']"
          >
            El campo de años es requerido.
          </span>
          <span
            class="font-medium text-red-500 leading-tight"
            *ngIf="form.get('years')?.errors?.['minValue']"
          >
            El campo de años debe ser al menos 1.
          </span>
          <span
            class="font-medium text-orange-500 leading-tight"
            *ngIf="form.get('years')?.errors?.['numericType']"
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
export class TechnicalSkillsModalFormComponent {
  modal_id: string = 'technical-skills-modal';
  @Input() id!: string;
  @Input() title!: string;

  constructor(private talentDetailService: TalentDetailService) { }

  form = new FormGroup({
    skill: new FormControl('', [CustomValidators.required, CustomValidators.minLength(1), CustomValidators.stringWithPunctuationValidator()]),
    years: new FormControl('', [CustomValidators.required, CustomValidators.minValue(1), CustomValidators.numericType()]),
  });


  addTechnicalSkillToCurrentTalent() {
    if (this.form.valid) {
      const { id, skill, years } = this.form.value;
      skill.trim();
      this.talentDetailService.addTechnicalSkillToCurrentTalent(
        id,
        skill,
        Number(years)
      );
      this.form.reset();
    }
  }
}
