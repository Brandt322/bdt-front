import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  template: `<div>
    <label [for]="id" class="block mb-2 text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <input
      type="date"
      [id]="id"
      [ngClass]="{' border-red-500': hasError}"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:text-gray-500"
      placeholder="{{ placeholder }}"
      [value]="value"
      [(ngModel)]="value"
      [disabled]="isDisabled"
      (ngModelChange)="onInputChange($event)"
    />
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() value: string | Date = '';
  @Input() isDisabled: boolean = false;
  @Input() hasError!: boolean;
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(value: string) {
    this.value = value;
    this.valueChange.emit(this.value);
    this.onChange(value);
  }

  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
