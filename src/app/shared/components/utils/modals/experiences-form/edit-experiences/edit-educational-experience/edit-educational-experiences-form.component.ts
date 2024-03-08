import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EducationalExperienceRequest } from 'src/app/shared/models/interfaces/educationalExperience.interface';

@Component({
  selector: 'app-edit-educational-experiences-form',
  templateUrl: './edit-educational-experiences-form.component.html'
})
export class EditEducationalExperiencesFormComponent implements OnInit {
  modal_id: string = 'edit-educational-experience-modal';
  @Input() title!: string;
  @Input() description!: string;
  @Input() educationalExperience!: EducationalExperienceRequest;
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
