import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';

@Component({
  selector: 'app-add-work-experiences-form',
  templateUrl: './add-work-experiences-form.component.html'
})
export class AddWorkExperiencesFormComponent implements OnInit {
  modal_id: string = 'add-work-experience-modal';
  @Input() title!: string;
  @Input() description!: string;
  @Input() workExperience!: WorkExperienceRequest;
  inputValue: string = '';
  currentDate = new Date();
  isCompanyFractal: boolean = false;
  isCurrentlyWorking: boolean = false;
  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;
  startDateValue: string | Date = '';
  endDateValue!: string | Date;
  constructor() { }

  ngOnInit(): void {
  }

  companyIfChecked(isChecked: boolean) {
    this.inputValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
      : '';
  }
}
