import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-checkbox-dropdown-select-data-modal',
  template: `
    <div
      [id]="modalId"
      class="z-10 hidden w-64 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul
        class="text-sm text-gray-700 dark:text-gray-200"
        [attr.aria-labelledby]="labelledby"
      >
        <li
          class="hover:bg-gray-50 cursor-pointer"
          (click)="handleChecked(i)"
          *ngFor="let item of data; let i = index"
        >
          <div
            class="flex items-center justify-between p-3"
            [ngClass]="{ 'bg-gray-200': selectedIndex === i}"
            [id]="item.id"
          >
            <span
              class="text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ item[labelKey].charAt(0).toUpperCase() + item[labelKey].slice(1).toLowerCase() }}</span
            >
            <i class="fa-solid fa-check text-blue-500" *ngIf="selectedIndex === i"></i>
          </div>
        </li>
      </ul>
    </div>
  `,
})

export class CheckboxDropdownSelectDataModalComponent {
  @Input() modalId!: string;
  @Input() labelledby!: string;
  @Input() data?: { id: number;[key: string]: any }[];
  @Input() labelKey!: string;
  @Output() optionSelected = new EventEmitter<number | null>();

  selectedIndex: number | null = null;

  handleChecked(index: number) {
    if (this.selectedIndex === index) {
      // Si el índice seleccionado es el mismo que el índice actual, deselecciona el elemento
      this.selectedIndex = null;
      this.optionSelected.emit(null);
    } else {
      // De lo contrario, selecciona el elemento
      this.selectedIndex = index; // Actualiza el índice del elemento seleccionado
      this.optionSelected.emit(index);
    }
  }
}
