import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cancel-save-buttons',
  template: `<div class="grid gap-4 md:grid-cols-2">
    <button
      [attr.data-modal-hide]="modal_id"
      (click)="$event.stopPropagation()"
      type="button"
      class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      Cancelar
    </button>
    <button
      [id]="save_button_id"
      [disabled]="form?.invalid"
      [attr.data-modal-hide]="modal_id"
      type="submit"
      class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-[#009788] hover:bg-[#0a655e]"
      [ngClass]="{
      'focus:outline-none  focus:ring-4 focus:ring-[#51f7db] dark:bg-[#04c8b0] dark:hover:bg-[#0a655e] dark:focus:ring-[#0a655e]': form?.valid,
      'cursor-not-allowed ': form?.invalid
  }"
    >
      Guardar
    </button>
  </div>`,
})
export class CancelSaveButtonsComponent {
  @Input() modal_id!: string;
  @Input() save_button_id!: string;
  @Input() form?: FormGroup;
}
