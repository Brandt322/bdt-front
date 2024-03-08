import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/components/services/shared-data-service.service';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';

@Component({
  selector: 'app-edit-work-experiences-form',
  templateUrl: './edit-work-experiences-form.component.html'
})
export class EditWorkExperiencesFormComponent implements OnInit {
  @Input() index!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() workExperience!: WorkExperienceRequest;
  modal_id!: string;
  companyValue: string = '';
  positionValue: string = '';
  currentDate = new Date();
  isCompanyFractal: boolean = false;
  isCurrentlyWorking: boolean = false;
  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;
  startDateValue: string | Date = '';
  endDateValue!: string | Date;
  modalsInitialized = false;

  constructor(private data: SharedDataService) { }

  ngOnInit(): void {
    // console.log(this.modal_id);
    this.modal_id = 'edit-work-experience-modal-' + this.index;
    this.companyValue = this.workExperience.company;
    this.isCompanyFractal = this.companyValue === 'Fractal';
    this.positionValue = this.workExperience.position;
    this.startDateValue = this.workExperience.startDate;
    this.endDateValue = this.workExperience.endDate;
    this.isCurrentlyWorking = this.workExperience.endDate instanceof Date && this.isToday(this.workExperience.endDate);
    console.log(this.workExperience)
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  companyIfChecked(isChecked: boolean) {
    this.companyValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
      : '';
  }
}
