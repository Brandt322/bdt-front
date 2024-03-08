import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/components/services/shared-data-service.service';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';
import { CheckboxInputComponent } from '../../../../form-inputs/checkbox-input-component';

@Component({
  selector: 'app-edit-work-experiences-form',
  templateUrl: './edit-work-experiences-form.component.html'
})
export class EditWorkExperiencesFormComponent implements OnInit {
  @Input() index!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() workExperience!: WorkExperienceRequest;
  workExperienceForm!: FormGroup;

  @Input() modal_id!: string;
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

  @ViewChild(CheckboxInputComponent) checkboxComponent!: CheckboxInputComponent;
  constructor(private data: SharedDataService, private fb: FormBuilder) { }


  cancelForm() {
    this.workExperienceForm.reset();
    this.checkboxComponent.resetCheckbox();
    this.companyValue = this.workExperience.company;
    this.positionValue = this.workExperience.position;
    this.startDateValue = this.workExperience.startDate;
    this.endDateValue = this.workExperience.endDate;

    // Reset the state of the checkboxes
    const isCompanyFractalControl = this.workExperienceForm.get('isCompanyFractal');
    if (isCompanyFractalControl) {
      isCompanyFractalControl.reset(this.isCompanyFractal);
    }

    const isCurrentlyWorkingControl = this.workExperienceForm.get('isCurrentlyWorking');
    if (isCurrentlyWorkingControl) {
      isCurrentlyWorkingControl.reset(this.isCurrentlyWorking);
    }

    // Disable the endDate input if the endDate is today
    const endDateControl = this.workExperienceForm.get('endDate');
    if (endDateControl) {
      if (this.isToday(this.workExperience.endDate)) {
        this.disableEndDateInput = true;
      } else {
        this.disableEndDateInput = false;
      }
    }

    // Disable the company input if the company is 'Fractal'
    const companyControl = this.workExperienceForm.get('company');
    if (companyControl) {
      if (this.workExperience.company === 'Fractal') {
        this.disableTextInput = true;
      } else {
        this.disableTextInput = false;
      }
    }
  }

  ngOnInit(): void {
    // console.log(this.modal_id);
    this.formBuild();
    // console.log(this.modal_id)
    console.log(this.workExperience.endDate)
  }

  formBuild() {
    this.isCompanyFractal = this.workExperience.company === 'Fractal';
    this.isCurrentlyWorking = this.isToday(this.workExperience.endDate);

    this.workExperienceForm = this.fb.group({
      company: [this.workExperience.company, Validators.required],
      position: [this.workExperience.position, Validators.required],
      startDate: [this.workExperience.startDate, Validators.required],
      endDate: [this.workExperience.endDate, Validators.required],
      isCompanyFractal: [this.isCompanyFractal],
      isCurrentlyWorking: [this.isToday(this.workExperience.endDate)]
    });

    // Disable the endDate input if the endDate is today
    const endDateControl = this.workExperienceForm.get('endDate');
    if (endDateControl && this.isToday(this.workExperience.endDate)) {
      this.disableEndDateInput = true;
    }

    // Disable the company input if the company is 'Fractal'
    const companyControl = this.workExperienceForm.get('company');
    if (companyControl && this.workExperience.company === 'Fractal') {
      this.disableTextInput = true;
      companyControl.disable();
    }
  }

  isToday(date: any): boolean {
    if (!(date instanceof Date)) {
      const [year, month, day] = date.split('-');
      date = new Date(year, month - 1, day); // Create a local date
    }
    date.setHours(0, 0, 0, 0); // Set the time to midnight

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight

    // console.log(date.getTime(), today.getTime())
    return date.getTime() === today.getTime();
  }

  companyIfChecked(isChecked: boolean) {
    this.companyValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
  }

  endDateIfChecked(isChecked: boolean) {
    const endDateControl = this.workExperienceForm.get('endDate');
    if (endDateControl) { }
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
      : '';
  }
}
