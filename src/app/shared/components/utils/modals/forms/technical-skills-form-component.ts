import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';

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
          [id]="'link-linkedin'"
          label="Habilidad técnica"
          placeholder="Nombre de la habilidad"
        >
        </app-text-input>
        <span
          class="font-medium text-red-500 leading-tight"
          *ngIf="
            form.controls['skill'].invalid && form.controls['skill'].touched
          "
        >
          Este campo es obligatorio.
        </span>
        <app-text-input
          formControlName="years"
          [id]="'link-github'"
          label="Años de experiencia"
          placeholder="Nro. de años"
        >
        </app-text-input>
        <span
          class="font-medium text-red-500 leading-tight"
          *ngIf="
            form.controls['years'].invalid && form.controls['years'].touched
          "
        >
          Este campo es obligatorio.
        </span>
      </div>
      <app-cancel-save-buttons
        [form]="form"
        [modal_id]="modal_id"
        [save_button_id]="'btn-socials'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class TechnicalSkillsModalFormComponent {
  modal_id: string = 'technical-skills-modal';
  @Input() id!: string;
  @Input() title!: string;

  form = new FormGroup({
    skill: new FormControl('', Validators.required),
    years: new FormControl('', Validators.required),
  });

  constructor(private talentDetailService: TalentDetailService) { }

  addTechnicalSkillToCurrentTalent() {
    if (this.form.valid) {
      const { skill, years } = this.form.value;
      this.talentDetailService.addTechnicalSkillToCurrentTalent(
        skill,
        Number(years)
      );
      this.form.reset();
    }
  }
}
