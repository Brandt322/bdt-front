import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EducationalExperienceRequest } from 'src/app/shared/models/interfaces/educationalExperience.interface';

@Component({
  selector: 'app-edit-educational-experiences-form',
  templateUrl: './edit-educational-experiences-form.component.html'
})
export class EditEducationalExperiencesFormComponent implements OnInit {
  @Input() index!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() educationalExperience!: EducationalExperienceRequest;
  modal_id!: string;
  institutionValue: string = '';

  startDateValue: string | Date = '';
  endDateValue!: string | Date;
  careerValue: string = '';
  degreeValue: string = '';

  currentDate = new Date();

  isEducationalFractal: boolean = false;
  isCurrentlyStudying: boolean = false;
  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.modal_id = 'edit-educational-experience-modal-' + this.index;
    this.institutionValue = this.educationalExperience.educationalInstitute;
    this.isEducationalFractal = this.institutionValue === 'Fractal';
    this.careerValue = this.educationalExperience.career;
    this.degreeValue = this.educationalExperience.degree;
    this.startDateValue = this.educationalExperience.startDate;
    this.endDateValue = this.educationalExperience.endDate;
    this.isCurrentlyStudying = this.educationalExperience.endDate instanceof Date && this.isToday(this.educationalExperience.endDate);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  institutionIfChecked(isChecked: boolean) {
    this.institutionValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;

  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
      : '';
  }
}
