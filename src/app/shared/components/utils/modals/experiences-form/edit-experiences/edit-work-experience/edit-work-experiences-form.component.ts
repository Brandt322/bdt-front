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
  inputValue: string = '';
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
