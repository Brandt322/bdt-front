import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-talent-create',
  templateUrl: './talent-create.component.html',
  styleUrls: ['./talent-create.component.css'],
})
export class TalentCreateComponent {}

/* Checkbox */
@Component({
  selector: 'app-checkbox',
  template: `
    <div class="flex items-center">
      <input
        [id]="id"
        type="checkbox"
        value=""
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label [for]="id" class="ms-2 text-sm text-gray-900 dark:text-gray-300">{{
        label
      }}</label>
    </div>
  `,
})
export class CheckboxComponent {
  @Input() id!: string;
  @Input() label!: string;
}

/* Text input */
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

/* Subtitle subsection */
@Component({
  selector: 'app-subtitle-form',
  template: `<h3 class="text-xl font-bold mb-6">{{ text }}</h3>`,
})
export class SubtitleFormComponent {
  @Input() text!: string;
}

/* File input */
@Component({
  selector: 'app-file-input',
  template: `<div class="flex items-center justify-center w-full mb-6">
    <label
      [for]="id"
      class="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <span class="font-semibold text-cyan-600">{{ title }}</span>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ description }}
        </p>
      </div>
      <input [id]="id" type="file" class="hidden" [accept]="accept" />
    </label>
  </div>`,
})
export class FileInputComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() accept!: string;
}

/* Add ability button */
@Component({
  selector: 'app-add-ability-button',
  template: ` <button class="text-start font-bold text-cyan-500">
    +
    <span class="hover:underline">Agregar más</span>
  </button>`,
})
export class AddAbilityButtonComponent {}
