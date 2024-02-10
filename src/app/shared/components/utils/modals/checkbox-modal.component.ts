import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-checkbox-modal',
  template: `
    <div
      [id]="modalId"
      class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul
        class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
        [attr.aria-labelledby]="labelledby"
      >
        <li *ngFor="let skill of skills">
          <div class="flex items-center">
            <input
              [id]="skill.id"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              [for]="skill.id"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ skill.name }}</label
            >
          </div>
        </li>
      </ul>
    </div>
  `,
})

export class CheckboxModalComponent {
  @Input() modalId!: string;
  @Input() labelledby!: string;
  @Input() skills!: { id: string; name: string }[];
}
