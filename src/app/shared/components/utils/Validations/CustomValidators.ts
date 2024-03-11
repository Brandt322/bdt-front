import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static required(control: AbstractControl) {
    const value = control.value;
    if (value == null || value.length === 0) {
      return { 'required': true };
    }
    return null;
  }

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value != null && value.length < min) {
        return { 'minLength': { min } };
      }
      return null;
    };
  }

  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value != null && value.length > max) {
        return { 'maxLength': { max } };
      }
      return null;
    };
  }

  static dateGreaterThan(startDateField: string, endDateField: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = control.get(startDateField)?.value;
      const endDate = control.get(endDateField)?.value;
      if (startDate != null && endDate != null && startDate > endDate) {
        return { 'dateGreaterThan': true };
      }
      return null;
    };
  }

  static stringType(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const stringPattern = /^[a-zA-Z áéíóúÁÉÍÓÚ]*$/;
      if (value != null && !stringPattern.test(value)) {
        return { 'stringType': true };
      }
      return null;
    };
  }

  static numericType(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const numericPattern = /^[0-9]*$/;
      if (value != null && !numericPattern.test(value)) {
        return { 'numericType': true };
      }
      return null;
    };
  }

  static minValue(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value != null && value < min) {
        return { 'minValue': { min } };
      }
      return null;
    };
  }

  static maxValue(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value != null && value > max) {
        return { 'maxValue': { max } };
      }
      return null;
    };
  }
}
