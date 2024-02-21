import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  template: `
    <div class="flex items-center">
      <input
        [(ngModel)]="isChecked"
        [id]="id"
        type="checkbox"
        value=""
        (change)="logCheckboxState($event)"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
      />
      <label [for]="id" class="ms-2 text-sm text-gray-900 dark:text-gray-300">{{
        label
      }}</label>
    </div>
  `,
})
export class CheckboxInputComponent {
  @Input() id!: string;
  @Input() label!: string;

  isChecked = false;

  @Output() isCheckedChange = new EventEmitter<boolean>();

  logCheckboxState(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.isChecked = target.checked;
      this.isCheckedChange.emit(this.isChecked);
      console.log(this.isChecked);
    }
  }
}
