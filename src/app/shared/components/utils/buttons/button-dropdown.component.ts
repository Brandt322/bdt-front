import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-button-dropdown',
  template: `
    <button
    type="button"
      [id]="buttonId"
      [attr.data-dropdown-toggle]="dropdownToggle"
      class="flex items-center text-nowrap text-md text-slate-700 justify-center w-full py-2 px-3 focus:outline-none bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      {{ buttonName }}

    </button>
  `,
})
export class ButtonDropdownComponent {
  @Input() buttonId!: string;
  @Input() dropdownToggle!: string;
  @Input() buttonName!: string;
  @Output() selectedValue = new EventEmitter<string>();
  @Output() selectedValues = new EventEmitter<string[]>();

  onValueSelected(value: string) {
    this.selectedValue.emit(value);
  }

  onValuesSelected(values: string[]) {
    this.selectedValues.emit(values);
  }

}
