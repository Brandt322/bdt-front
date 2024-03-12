import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { EducationalExperienceRequest } from 'src/app/shared/models/interfaces/educationalExperience.interface';
import { CheckboxInputComponent } from '../../../../form-inputs/checkbox-input-component';
import { CustomValidators } from '../../../../Validations/CustomValidators';

@Component({
  selector: 'app-add-educational-experiences-form',
  templateUrl: './add-educational-experiences-form.component.html'
})
export class AddEducationalExperiencesFormComponent implements OnInit {
  @Input() modal_id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() educationalExperience!: EducationalExperienceRequest;
  educationalExperienceForm!: FormGroup;

  institutionValue: string = '';
  careerValue: string = '';
  degreeValue: string = '';
  startDateValue: string | Date = '';
  endDateValue!: string | Date;

  currentDate = new Date();

  isEducationalFractal: boolean = false;
  isCurrentlyStudying: boolean = false;
  disableTextInput: boolean = false;
  disableEndDateInput: boolean = false;

  @ViewChild(CheckboxInputComponent) checkboxComponent!: CheckboxInputComponent;

  constructor(private fb: FormBuilder, private talentDetailService: TalentDetailService) { }

  ngOnInit(): void {
    this.formBuild();
  }

  cancelForm() {
    this.educationalExperienceForm.reset();
    this.checkboxComponent.resetCheckbox();
    this.institutionValue = '';
    this.disableTextInput = false;
    this.disableEndDateInput = false;
    this.endDateValue = '';
  }

  formBuild() {
    this.educationalExperienceForm = this.fb.group({
      educationalInstitute: ['', [CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]],
      career: ['', [CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]],
      degree: ['', [CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]],
      startDate: ['', CustomValidators.required],
      endDate: ['', CustomValidators.required],
      isEducationalFractal: [false],
      isCurrentlyStudying: [false]
    }, { validators: CustomValidators.dateGreaterThan('startDate', 'endDate') });

    this.educationalExperienceForm.get('isEducationalFractal')?.valueChanges.subscribe(isEducationalFractal => {
      if (isEducationalFractal) {
        this.educationalExperienceForm.get('educationalInstitute')?.clearValidators();
      } else {
        this.educationalExperienceForm.get('educationalInstitute')?.setValidators([CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]);
      }
      this.educationalExperienceForm.get('educationalInstitute')?.updateValueAndValidity();
    });

    this.educationalExperienceForm.get('isCurrentlyStudying')?.valueChanges.subscribe(isCurrentlyStudying => {
      if (isCurrentlyStudying) {
        this.educationalExperienceForm.get('endDate')?.clearValidators();
      } else {
        this.educationalExperienceForm.get('endDate')?.setValidators(CustomValidators.required);
      }
      this.educationalExperienceForm.get('endDate')?.updateValueAndValidity();
    });
  }

  institutionIfChecked(isChecked: boolean) {
    this.institutionValue = isChecked ? 'Fractal' : '';
    this.disableTextInput = isChecked;
    this.educationalExperienceForm.get('educationalInstitute')?.setValue(this.institutionValue);
  }

  endDateIfChecked(isChecked: boolean) {
    this.disableEndDateInput = isChecked;
    this.endDateValue = isChecked
      ? formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
      : '';
    this.educationalExperienceForm.get('endDate')?.setValue(this.endDateValue);
  }

  submitForm() {
    if (this.educationalExperienceForm.valid) {
      this.educationalExperienceForm.markAllAsTouched();
      const formValues = this.educationalExperienceForm.value;
      let { id, educationalInstitute, career, degree, startDate, endDate } = formValues

      educationalInstitute = educationalInstitute.trim();
      career = career.trim();
      degree = degree.trim();

      this.talentDetailService.addEducationalExperienceToCurrentTalent(
        id,
        educationalInstitute,
        career,
        degree,
        startDate,
        endDate
      );
      this.cancelForm();
    }
  }
}
