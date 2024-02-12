import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-technical-skills-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Agrega una nueva habilidad técnica"
  >
    <form action="">
      <div class="grid gap-4 mb-6">
        <app-text-input
          [id]="'link-linkedin'"
          label="Habilidad técnica"
          placeholder="Nombre de la habilidad"
        >
        </app-text-input>
        <app-text-input
          [id]="'link-github'"
          label="Años de experiencia"
          placeholder="Nro. de años"
        >
        </app-text-input>
      </div>
      <app-cancel-save-buttons
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
}
