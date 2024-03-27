import { formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';
import { TalentDetailService } from '../../../../../../../features/services/talent-detail.service';
import { initModals } from 'flowbite';
import { CustomValidators } from '../../../../Validations/CustomValidators';

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
    setTimeout(() => initModals(), 0)
  }

  ngOnInit(): void {
    // console.log(this.modal_id);
    this.formBuild();
    // this.cdr.detectChanges();
    // console.log(this.workExperience.endDate)
  }

  formBuild() {
    this.isCompanyFractal = this.workExperience.company === 'Fractal';
    this.isCurrentlyWorking = this.workExperience.isCurrent;
    let endDateValue = this.workExperience.endDate;
    if (this.workExperience.isCurrent && this.workExperience.endDate === null) {
      endDateValue = new Date(); // Assign the current date
    }



    // console.log(this.workExperience.isCurrent)
    this.workExperienceForm = this.fb.group({
      company: [this.workExperience.company, [CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]],
      position: [this.workExperience.position, [CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]],
      startDate: [this.workExperience.startDate, CustomValidators.required],
      endDate: [endDateValue, CustomValidators.required],
      isCompanyFractal: [this.isCompanyFractal],
      isCurrentlyWorking: [this.workExperience.isCurrent]
    }, { validators: CustomValidators.dateGreaterThan('startDate', 'endDate') });

    // Disable the endDate input if the endDate is today
    const endDateControl = this.workExperienceForm.get('endDate');
    if (endDateControl && this.isToday(endDateValue)) {
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
      isCurrentlyWorking: this.workExperience.isCurrent
    });

    // Reset the state of the checkboxes
    const isCompanyFractalControl = this.workExperienceForm.get('isCompanyFractal');
    if (isCompanyFractalControl) {
      isCompanyFractalControl.reset(this.isCompanyFractal);
    }

    const isCurrentlyWorkingControl = this.workExperienceForm.get('isCurrentlyWorking');
    if (isCurrentlyWorkingControl) {
      isCurrentlyWorkingControl.reset(this.workExperience.isCurrent);
    }

    // Disable the endDate input if the endDate is today
    const endDateControl = this.workExperienceForm.get('endDate');
    if (endDateControl) {
      if (this.workExperience.isCurrent) {
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
      if (isChecked) {
        endDateControl.setValue(isChecked ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US') : '');
        this.disableEndDateInput = true;
      } else {
        endDateControl.setValue(null);
        this.disableEndDateInput = false;
        // endDateControl.enable();
      }
    }
  }

  submitForm() {
    if (this.workExperienceForm.valid) {
      const formValues = this.workExperienceForm.value;
      let { company, position, startDate, endDate, isCurrentlyWorking } = formValues;
      company = company.trim();
      position = position.trim();
      this.talentDetailService.updateWorkExperienceForCurrentTalent(this.id, this.id, company, position, startDate, endDate, isCurrentlyWorking);
      // this.cancelForm();
      // this.cdr.markForCheck();
    }
  }
}
