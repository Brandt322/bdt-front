import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  template: `<div
    class="flex items-center ps-4 border rounded-lg border-gray-200 dark:border-gray-700 mb-2"
    *ngFor="let item of data"
  >
    <input
      [id]="item.id"
      type="radio"
      [value]="item.id"
      name="currencyOption"
      (change)="onOptionSelected($event)"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label
      [for]="item.id"
      class="w-full py-4 ms-2 text-sm text-gray-900 dark:text-gray-300"
      >{{
        item[labelKey].charAt(0).toUpperCase() +
          item[labelKey].slice(1).toLowerCase() +
          'es'
      }}</label
    >
  </div>`,
})
export class RadioInputComponent {
  @Input() data?: { id: number;[key: string]: any; abr?: string }[];
  @Input() labelKey!: string;
  @Output() optionSelected = new EventEmitter<number>();

  onOptionSelected(event: any) {
    this.optionSelected.emit(event.target.value);
  }
}
