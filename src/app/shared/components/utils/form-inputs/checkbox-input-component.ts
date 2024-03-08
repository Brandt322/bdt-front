import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInputComponent),
      multi: true
    }
  ]
})
export class CheckboxInputComponent implements OnInit, ControlValueAccessor {
  @Input() id!: string;
  @Input() label!: string;
  @Input() resetFormEvent!: EventEmitter<void>;
  @Input() isChecked: boolean = false;

  @Output() isCheckedChange = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.resetFormEvent) {
      this.resetFormEvent.subscribe(() => {
        this.isChecked = false;
      });
    }
  }


  logCheckboxState(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.isChecked = target.checked;
      this.isCheckedChange.emit(this.isChecked);
      this.onChange(this.isChecked);
      console.log(this.isChecked);
    }
  }

  resetCheckbox() {
    this.isChecked = false;
  }

  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.isChecked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
