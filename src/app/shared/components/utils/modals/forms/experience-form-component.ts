import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience-modal-form',
  template: ` <app-base-modal-form
    [id]="modal_id"
    title="{{ title }}"
    description="{{ description }}"
  >
    <form action="">
      <div class="grid gap-4 mb-8">
        <app-text-input
          [id]="'company'"
          label="Empresa"
          placeholder="Nombre de la empresa"
        ></app-text-input>
        <app-checkbox-input
          [id]="'here'"
          label="Aquí en Fractal"
        ></app-checkbox-input>
        <app-text-input
          [id]="'position'"
          label="Puesto"
          placeholder="Puesto en la empresa"
        ></app-text-input>
        <div class="grid gap-4 md:grid-cols-2">
          <app-date-input
            [id]="'start-date'"
            label="Año y mes de inicio"
            placeholder="Ingrese la fecha de inicio"
          ></app-date-input>
          <app-date-input
            [id]="'end-date'"
            label="Año y mes de fin"
            placeholder="Ingrese la fecha de fin"
          ></app-date-input>
        </div>
        <app-checkbox-input
          [id]="'currently'"
          label="Hasta la actualidad"
        ></app-checkbox-input>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save-experience'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class ExperienceModalFormComponent {
  modal_id: string = 'experience-modal-form';
  @Input() title!: string;
  @Input() description!: string;
}
