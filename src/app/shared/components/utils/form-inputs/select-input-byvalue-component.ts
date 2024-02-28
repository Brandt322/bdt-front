import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-value-select-input',
  template: `<div class="{{ class }}">
    <label [for]="id" class="block mb-2 text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <select
      [id]="id"
      (change)="onOptionSelected($event)"
      [ngClass]="{' border-red-500': hasError}"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected value="null">{{ optionName }}</option>
      <option *ngFor="let option of data" [value]="option[optionKey]">
        {{
          option[optionKey].charAt(0).toUpperCase() +
            option[optionKey].slice(1).toLowerCase()
        }}
      </option>
    </select>
  </div>`,
})
export class SelectInputByValueComponent {

  @Input() id!: string;
  @Input() class!: string;
  @Input() label!: string;
  @Input() optionName!: string;
  @Input() data?: { id: number;[key: string]: any; abr?: string }[];
  @Input() optionKey!: string;
  @Input() hasError!: boolean;
  @Output() optionSelected = new EventEmitter<string>();

  onOptionSelected(event: any) {
    const value = event.target.value === 'null' ? null : event.target.value;
    this.optionSelected.emit(value);
  }
}
