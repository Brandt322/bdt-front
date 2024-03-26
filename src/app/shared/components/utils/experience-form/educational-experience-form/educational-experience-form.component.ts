import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EducationalExperienceRequest } from 'src/app/shared/models/interfaces/educationalExperience.interface';

@Component({
  selector: 'app-educational-experience-form',
  templateUrl: './educational-experience-form.component.html',
})
export class EducationalExperienceFormComponent implements OnChanges {
  inputValue: string = '';
  isEducationalFractal: boolean = false;
  careerValue: string = '';
  degreeValue: string = '';
  startDateValue: string | Date = '';
  endDateValue!: string | Date;
  isCurrentlyStudying: boolean = false;
  currentDate = new Date();
  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;

  @Output() inputChange = new EventEmitter<{ id: string, value: string, arrayName: string }>();
  @Input() createTalentForm!: FormGroup;
  @Input() getFieldError?: (fieldName: string) => string | null;
  @Input() isValidField?: (fieldName: string) => boolean;
  @Input() educationalExperience!: EducationalExperienceRequest;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['educationalExperience'] && changes['educationalExperience'].currentValue) {
      this.inputValue = this.educationalExperience.educationalInstitute || '';
      this.isEducationalFractal = this.inputValue === 'Fractal';
      this.careerValue = this.educationalExperience.career || '';
      this.degreeValue = this.educationalExperience.degree || '';
      this.startDateValue = this.educationalExperience.startDate || '';
      this.endDateValue = this.educationalExperience.endDate || '';
      this.isCurrentlyStudying = this.educationalExperience.endDate instanceof Date && this.isToday(this.educationalExperience.endDate);
      this.disableEndDateInput = this.educationalExperience.isCurrent;
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
      this.inputChange.emit({ id, value: event.target.value, arrayName: 'educationalExperiencesList' });
    }
  }

  institutionIfChecked(isChecked: boolean) {
    this.inputValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
    this.inputChange.emit({ id: 'educationalInstitute', value: this.inputValue, arrayName: 'educationalExperiencesList' });
  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
      : '';
    this.inputChange.emit({ id: 'endDate', value: this.endDateValue, arrayName: 'educationalExperiencesList' });
    this.inputChange.emit({ id: 'isCurrent', value: isChecked.toString(), arrayName: 'educationalExperiencesList' });
  }
}
