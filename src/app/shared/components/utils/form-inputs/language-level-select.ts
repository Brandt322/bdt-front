import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-language-level-select',
  template: ` <label
      [for]="id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Nivele</label
    >
    <select
      (change)="onSelectChange($event)"
      [id]="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option [value]="0" selected>-- Niveles --</option>
      <option
        *ngFor="let option of options"
        [value]="option.value"
        [attr.selected]="option.value == defaultValue ? true : null"
      >
        {{ option.label }}
      </option>
    </select>`,
})
export class LanguageLevelSelectComponent {
  @Input() id!: string;
  @Input() defaultValue!: number;
  @Output() EmtSelectedValue = new EventEmitter<number>();

  options: { value: number; label: string }[] = [
    {
      value: 1,
      label: 'Básico',
    },
    {
      value: 2,
      label: 'Intermedio',
    },
    {
      value: 3,
      label: 'Avanzado',
    },
    {
      value: 4,
      label: 'Nativo',
    },
  ];

  onSelectChange(event: Event): void {
    this.EmtSelectedValue.emit(
      Number((event.target as HTMLSelectElement).value)
    );
  }
}
