import { formatDate } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
})
export class WorkExperienceFormComponent {
  inputValue: string = '';
  endDateValue!: string;
  currentDate = new Date();

  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;

  companyIfChecked(isChecked: boolean) {
    this.inputValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM', 'en-US')
      : '';
  }
}
