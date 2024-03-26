import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';

@Component({
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
})
export class WorkExperienceFormComponent implements OnChanges {
  inputValue: string = '';
  isCompanyFractal: boolean = false;
  positionValue: string = '';
  startDateValue: string | Date = '';
  endDateValue!: string | Date;
  isCurrentlyWorking: boolean = false;
  currentDate = new Date();
  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;

  @Output() inputChange = new EventEmitter<{ id: string, value: string, arrayName: string }>();
  @Input() createTalentForm!: FormGroup;
  @Input() getFieldError?: (fieldName: string) => string | null;
  @Input() isValidField?: (fieldName: string) => boolean;
  @Input() workExperience!: WorkExperienceRequest;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['workExperience'] && changes['workExperience'].currentValue) {
      this.inputValue = this.workExperience.company || '';
      this.positionValue = this.workExperience.position || '';
      this.isCompanyFractal = this.inputValue === 'Fractal';
      this.startDateValue = this.workExperience.startDate || '';
      this.endDateValue = this.workExperience.endDate || '';
      this.isCurrentlyWorking = this.workExperience.endDate instanceof Date && this.isToday(this.workExperience.endDate);
      this.disableEndDateInput = this.workExperience.isCurrent;
      // Asigna los demás valores de la experiencia de trabajo a las variables correspondientes
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  onInputChange(event: any, id: string) {
    if (event.target) {
      this.inputChange.emit({ id, value: event.target.value, arrayName: 'workExperiencesList' });
    }
  }

  companyIfChecked(isChecked: boolean) {
    this.inputValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
    this.inputChange.emit({ id: 'company', value: this.inputValue, arrayName: 'workExperiencesList' });
  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
      : '';
    this.inputChange.emit({ id: 'endDate', value: this.endDateValue, arrayName: 'workExperiencesList' });
    this.inputChange.emit({ id: 'isCurrent', value: isChecked.toString(), arrayName: 'workExperiencesList' });
  }
}
