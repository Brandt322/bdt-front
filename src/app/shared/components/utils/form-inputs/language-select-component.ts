import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-select',
  template: `<label
      for="countries"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Idioma</label
    >
    <select
      id="countries"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected>Idioma</option>
      <option value="1">Español</option>
      <option value="2">Inglés</option>
      <option value="3">Francés</option>
    </select>`,
})
export class LanguageSelectComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() class!: string;
}

@Component({
  selector: 'app-language-level-select',
  template: `<label
      for="countries"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Nivel</label
    >
    <select
      id="countries"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected>Nivel</option>
      <option value="1">Básico</option>
      <option value="2">Intermedio</option>
      <option value="3">Avanzado</option>
      <option value="4">Normal</option>
    </select>`,
})
export class LanguageLevelSelectComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() class!: string;
}
