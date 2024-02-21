import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-input',
  template: `<div>
    <label [for]="id" class="block mb-2 text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <input
      type="month"
      [id]="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:text-gray-500"
      placeholder="{{ placeholder }}"
      [value]="value"
      [disabled]="isDisabled"
    />
  </div>`,
})
export class DateInputComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() value: string = '';
  @Input() isDisabled: boolean = false;
}
