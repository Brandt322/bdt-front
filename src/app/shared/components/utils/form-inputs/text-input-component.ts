import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  template: `<div>
    <label [for]="id" class="block mb-2 text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <input
      type="text"
      [id]="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="{{ placeholder }}"
    />
  </div>`,
})
export class TextInputComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
}
