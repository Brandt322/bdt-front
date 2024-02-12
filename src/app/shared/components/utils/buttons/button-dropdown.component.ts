import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-button-dropdown',
  template: `
    <button
      [id]="buttonId"
      [attr.data-dropdown-toggle]="dropdownToggle"
      class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
    >
      {{ buttonName }}
      <svg
        class="w-2.5 h-2.5 ms-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
  `,
})
export class ButtonDropdownComponent {
  @Input() buttonId!: string;
  @Input() dropdownToggle!: string;
  @Input() buttonName!: string;
}
