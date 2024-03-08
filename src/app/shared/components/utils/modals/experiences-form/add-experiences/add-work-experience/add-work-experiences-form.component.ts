import { formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';
import { CheckboxInputComponent } from '../../../../form-inputs/checkbox-input-component';

@Component({
  selector: 'app-add-work-experiences-form',
  templateUrl: './add-work-experiences-form.component.html'
})
export class AddWorkExperiencesFormComponent implements OnInit {
  @Input() modal_id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() workExperience!: WorkExperienceRequest;
  workExperienceForm!: FormGroup;

  companyValue: string = '';
  currentDate = new Date();
  isCompanyFractal: boolean = false;
  isCurrentlyWorking: boolean = false;
  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;
  startDateValue: string | Date = '';
  endDateValue!: string | Date;

  @ViewChild(CheckboxInputComponent) checkboxComponent!: CheckboxInputComponent;

  constructor(private fb: FormBuilder, private talentDetailService: TalentDetailService) { }

  ngOnInit(): void {
    this.formBuild();
    // console.log(this.modal_id)
  }

  cancelForm() {
    this.workExperienceForm.reset();
    this.checkboxComponent.resetCheckbox();
    this.companyValue = '';
    this.disableTextInput = false;
    this.disableEndDateInput = false;
    this.endDateValue = '';
  }
  formBuild() {
    this.workExperienceForm = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isCompanyFractal: [false],
      isCurrentlyWorking: [false]
    });

    this.workExperienceForm.get('isCurrentlyWorking')?.valueChanges.subscribe(isCurrentlyWorking => {
      if (isCurrentlyWorking) {
        this.workExperienceForm.get('endDate')?.clearValidators();
      } else {
        this.workExperienceForm.get('endDate')?.setValidators(Validators.required);
      }
      this.workExperienceForm.get('endDate')?.updateValueAndValidity();
    });

    this.workExperienceForm.get('isCompanyFractal')?.valueChanges.subscribe(isCompanyFractal => {
      if (isCompanyFractal) {
        this.workExperienceForm.get('company')?.clearValidators();
      } else {
        this.workExperienceForm.get('company')?.setValidators(Validators.required);
      }
      this.workExperienceForm.get('company')?.updateValueAndValidity();
    });
  }

  companyIfChecked(isChecked: boolean) {
    this.companyValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
    this.workExperienceForm.get('company')?.setValue(this.companyValue);
  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
      : '';
    this.workExperienceForm.get('endDate')?.setValue(this.endDateValue);
  }

  submitForm() {
    if (this.workExperienceForm.valid) {
      const formValues = this.workExperienceForm.value;
      let { company, position, startDate, endDate } = formValues
      this.talentDetailService.addWorkExperienceToCurrentTalent(company, position, startDate, endDate);
      this.cancelForm();
    }
  }
}
