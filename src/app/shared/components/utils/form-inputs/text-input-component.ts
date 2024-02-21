import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  template: `<div class="{{ class }}">
    <label [for]="id" class="block mb-2 text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <input
      type="text"
      [value]="value"
      [id]="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:text-gray-500"
      placeholder="{{ placeholder }}"
      [disabled]="isDisabled"
    />
  </div>`,
})
export class TextInputComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() class!: string;
  @Input() value: string = '';
  @Input() isDisabled: boolean = false;
}
