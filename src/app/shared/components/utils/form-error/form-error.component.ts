import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  template: `
    <div *ngIf="control.touched && control.errors">
      <span *ngIf="control.errors?.['required']" class="font-medium text-red-500">
        Este campo es requerido
      </span>
      <span *ngIf="control.errors?.['minlength']" class="font-medium text-red-500">
        Debe tener al menos {{ control.errors['minlength'].requiredLength }} caracteres
      </span>
      <!-- Another validations -->
    </div>
  `,
})
export class FormErrorComponent {
  @Input() control!: AbstractControl;
}
