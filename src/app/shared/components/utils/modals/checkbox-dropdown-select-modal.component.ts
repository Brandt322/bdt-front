import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-checkbox-dropdown-select-modal',
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
          *ngFor="let element of data; let i = index"
        >
          <div
            class="flex items-center justify-between p-3"
            [ngClass]="{ 'bg-gray-200': selectedIndex === i}"
            [id]="element.id"
          >
            <label
              class="text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ element.name }}</label
            >
            <i class="fa-solid fa-check text-blue-500" *ngIf="selectedIndex === i"></i>
          </div>
        </li>
      </ul>
    </div>
  `,
})

export class CheckboxDropdownSelectModalComponent {
  @Input() modalId!: string;
  @Input() labelledby!: string;
  @Input() data!: { id: string; name: string }[];

  selectedIndex: number | null = null;

  handleChecked(index: number) {
    this.selectedIndex = index; // Actualiza el índice del elemento seleccionado
  }
}
