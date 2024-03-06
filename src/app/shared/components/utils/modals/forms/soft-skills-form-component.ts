import { Component, Input, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
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
        <span
          class="font-medium text-red-500 leading-tight"
          *ngIf="
            form.controls['skill'].invalid && form.controls['skill'].touched
          "
        >
          Este campo es obligatorio.
        </span>
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
    skill: new FormControl('', Validators.required),
  });


  addTechnicalSkillToCurrentTalent() {
    if (this.form.valid) {
      const { skill } = this.form.value;
      this.talentDetailService.addSoftSkillToCurrentTalent(
        skill
      );
      this.form.reset();
    }
  }
}
