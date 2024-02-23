import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  @Output() inputChange = new EventEmitter<{ id: string, value: string }>();
  @Input() createTalentForm!: FormGroup;
  @Input() getFieldError?: (fieldName: string) => string | null;
  @Input() isValidField?: (fieldName: string) => boolean;

  onInputChange(event: any, id: string) {
    if (event.target) {
      this.inputChange.emit({ id, value: event.target.value });
    }
  }

  companyIfChecked(isChecked: boolean) {
    this.inputValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
    this.inputChange.emit({ id: 'company', value: this.inputValue });
  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM', 'en-US')
      : '';
    this.inputChange.emit({ id: 'endDate', value: this.endDateValue });
  }
}
