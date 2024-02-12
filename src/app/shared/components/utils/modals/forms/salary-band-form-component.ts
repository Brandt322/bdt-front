import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-salary-band-modal-form',
  template: `<app-base-modal-form
    [id]="modal_id"
    title="Agrega la banda salarial"
    description="Agrega el rango de tus espectativas salariales."
  >
    <form action="">
      <div class="grid gap-4 mb-8">
        <div
          class="flex items-center ps-4 border rounded-lg border-gray-200 dark:border-gray-700 space-y-reverse"
        >
          <input
            id="bordered-radio-1"
            type="radio"
            value=""
            name="bordered-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-radio-1"
            class="w-full py-4 ms-2 text-sm text-gray-900 dark:text-gray-300"
            >Soles</label
          >
        </div>
        <div
          class="flex items-center ps-4 border rounded-lg border-gray-200 dark:border-gray-700"
        >
          <input
            id="bordered-radio-2"
            type="radio"
            value=""
            name="bordered-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-radio-2"
            class="w-full py-4 ms-2 text-sm text-gray-900 dark:text-gray-300"
            >Dólares</label
          >
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <app-text-input
            [id]="'monto-inicial'"
            label="Monto inicial"
            placeholder="Ingrese el monto inicial"
          >
          </app-text-input>
          <app-text-input
            [id]="'monto-final'"
            label="Monto final"
            placeholder="Ingrese el monto final"
          >
          </app-text-input>
        </div>
      </div>
      <app-cancel-save-buttons
        [modal_id]="modal_id"
        [save_button_id]="'save_'"
      ></app-cancel-save-buttons>
    </form>
  </app-base-modal-form>`,
})
export class SalaryBandModalForm {
  modal_id: string = 'salary-band-modal';
  @Input() id!: string;
  @Input() title!: string;
}
