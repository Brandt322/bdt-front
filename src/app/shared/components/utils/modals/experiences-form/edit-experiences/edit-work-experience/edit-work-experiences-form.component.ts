import { formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';
import { TalentDetailService } from '../../../../../../../features/services/talent-detail.service';
import { initModals } from 'flowbite';

@Component({
  selector: 'app-edit-work-experiences-form',
  templateUrl: './edit-work-experiences-form.component.html'
})
export class EditWorkExperiencesFormComponent implements OnInit, AfterViewInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() workExperience!: WorkExperienceRequest;
  @Input() modal_id!: string;
  workExperienceForm!: FormGroup;

  companyValue: string = '';
  positionValue: string = '';

  currentDate = new Date();

  isCompanyFractal: boolean = false;
  isCurrentlyWorking: boolean = false;
  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;
  startDateValue: string | Date = '';
  endDateValue!: string | Date;

  constructor(private fb: FormBuilder, private talentDetailService: TalentDetailService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    console.log(this.modal_id);
    this.formBuild();
    setTimeout(() => initModals())
    // this.cdr.detectChanges();
    // console.log(this.workExperience.endDate)
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
    if (companyControl && this.isCompanyFractal) {
      this.disableTextInput = true;
    }

    // this.cdr.detectChanges();
  }

  cancelForm() {
    this.workExperienceForm.reset({
      company: this.workExperience.company,
      position: this.workExperience.position,
      startDate: this.workExperience.startDate,
      endDate: this.workExperience.endDate,
      isCompanyFractal: this.isCompanyFractal,
      isCurrentlyWorking: this.isToday(this.workExperience.endDate)
    });

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
      if (this.isCompanyFractal) {
        this.disableTextInput = true;
      } else {
        this.disableTextInput = false;
      }
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
    const companyControl = this.workExperienceForm.get('company');
    if (companyControl) {
      companyControl.setValue(isChecked ? 'Fractal' : '');
      if (isChecked) {
        this.disableTextInput = true;
      } else {
        this.disableTextInput = false;
        // companyControl.enable();
      }
    }
  }

  endDateIfChecked(isChecked: boolean) {
    const endDateControl = this.workExperienceForm.get('endDate');
    if (endDateControl) {
      endDateControl.setValue(isChecked ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US') : '');
      if (isChecked) {
        this.disableEndDateInput = true;
      } else {
        this.disableEndDateInput = false;
        endDateControl.enable();
      }
    }
  }

  submitForm() {
    if (this.workExperienceForm.valid) {
      const formValues = this.workExperienceForm.value;
      let { company, position, startDate, endDate } = formValues;
      this.talentDetailService.updateWorkExperienceForCurrentTalent(this.id, this.id, company, position, startDate, endDate);
      // this.cancelForm();
      // this.cdr.markForCheck();
    }
  }
}
