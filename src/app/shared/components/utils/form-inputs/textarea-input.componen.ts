import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-textarea-select',
  template: `<label
      for="feedback"
      class="block mb-2 text-gray-900 dark:text-white"
      [ngClass]="{
        'font-medium text-sm': variant === 'modal',
        'font-normal': variant !== 'modal'
      }"
      >{{ label }}</label
    >
    <textarea
      id="feedback"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-h-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      [placeholder]="placeholder"
      [(ngModel)]="value"
      (ngModelChange)="onChange($event)"
      [disabled]="isDisabled"
      (blur)="onTouch()"
      [ngClass]="{ ' border-red-500': hasError }"
    ></textarea> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaInputComponent),
      multi: true,
    },
  ],
})
export class TextAreaInputComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() variant!: string;
  @Input() currentValue: string = '';
  @Input() isDisabled: boolean = false;
  @Input() hasError!: boolean;
  private _value: string = '';
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }
  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
