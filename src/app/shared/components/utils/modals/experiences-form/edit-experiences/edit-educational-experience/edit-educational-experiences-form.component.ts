import { formatDate } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { EducationalExperienceRequest } from 'src/app/shared/models/interfaces/educationalExperience.interface';
import { CustomValidators } from '../../../../Validations/CustomValidators';
import { initModals } from 'flowbite';

@Component({
  selector: 'app-edit-educational-experiences-form',
  templateUrl: './edit-educational-experiences-form.component.html'
})
export class EditEducationalExperiencesFormComponent implements OnInit, AfterViewInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() educationalExperience!: EducationalExperienceRequest;
  @Input() modal_id!: string;
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

  constructor(private fb: FormBuilder, private talentDetailService: TalentDetailService) { }

  ngAfterViewInit(): void {
    // setTimeout(() => initModals(), 0)
  }

  ngOnInit(): void {
    this.formBuild();
  }

  formBuild() {

    this.isEducationalFractal = this.educationalExperience.educationalInstitute === 'Fractal';
    this.isCurrentlyStudying = this.educationalExperience.isCurrent;
    let endDateValue = this.educationalExperience.endDate;
    if (this.educationalExperience.isCurrent && this.educationalExperience.endDate === null) {
      endDateValue = new Date(); // Assign the current date
    }

    this.educationalExperienceForm = this.fb.group({
      educationalInstitute: [this.educationalExperience.educationalInstitute, [CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]],
      career: [this.educationalExperience.career, [CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]],
      degree: [this.educationalExperience.degree, [CustomValidators.required, CustomValidators.minLength(3), CustomValidators.stringType()]],
      startDate: [this.educationalExperience.startDate, CustomValidators.required],
      endDate: [this.educationalExperience.endDate, CustomValidators.required],
      isEducationalFractal: [this.isEducationalFractal],
      isCurrentlyStudying: [this.educationalExperience.isCurrent]
    }, { validators: CustomValidators.dateGreaterThan('startDate', 'endDate') });

    // Disable the endDate input if the endDate is today
    const endDateControl = this.educationalExperienceForm.get('endDate');
    if (endDateControl && this.isToday(endDateValue)) {
      this.disableEndDateInput = true;
    }

    // Disable the company input if the company is 'Fractal'
    const companyControl = this.educationalExperienceForm.get('educationalInstitute');
    if (companyControl && this.isEducationalFractal) {
      this.disableTextInput = true;
    }
  }

  cancelForm() {
    this.educationalExperienceForm.reset({
      educationalInstitute: this.educationalExperience.educationalInstitute,
      career: this.educationalExperience.career,
      degree: this.educationalExperience.degree,
      startDate: this.educationalExperience.startDate,
      endDate: this.educationalExperience.endDate,
      isEducationalFractal: this.isEducationalFractal,
      isCurrentlyStudying: this.educationalExperience.isCurrent
    });

    // Reset the state of the checkboxes
    const isEducationalFractalControl = this.educationalExperienceForm.get('isEducationalFractal');
    if (isEducationalFractalControl) {
      isEducationalFractalControl.reset(this.isEducationalFractal);
    }

    const isCurrentlyStudyingControl = this.educationalExperienceForm.get('isCurrentlyStudying');
    if (isCurrentlyStudyingControl) {
      isCurrentlyStudyingControl.reset(this.educationalExperience.isCurrent);
    }

    // Disable the endDate input if the endDate is today
    const endDateControl = this.educationalExperienceForm.get('endDate');
    if (endDateControl) {
      if (this.educationalExperience.isCurrent) {
        this.disableEndDateInput = true;
      } else {
        this.disableEndDateInput = false;
      }
    }

    // Disable the company input if the company is 'Fractal'
    const companyControl = this.educationalExperienceForm.get('educationalInstitute');
    if (companyControl) {
      if (this.isEducationalFractal) {
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

  institutionIfChecked(isChecked: boolean) {
    const institutionControl = this.educationalExperienceForm.get('educationalInstitute');
    if (institutionControl) {
      institutionControl.setValue(isChecked ? 'Fractal' : '');
      if (isChecked) {
        this.disableTextInput = true;
      } else {
        this.disableTextInput = false;
      }
    }
  }

  endDateIfChecked(isChecked: boolean) {
    const endDateControl = this.educationalExperienceForm.get('endDate');
    if (endDateControl) {
      if (isChecked) {
        this.disableEndDateInput = true;
        endDateControl.setValue(formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US'));
      } else {
        this.disableEndDateInput = false;
        endDateControl.setValue(null);
      }
    }
  }

  submitForm() {
    if (this.educationalExperienceForm.valid) {
      const educationalExperience = this.educationalExperienceForm.value;
      let { educationalInstitute, career, degree, startDate, endDate, isCurrentlyStudying } = educationalExperience;
      educationalInstitute = educationalInstitute.trim();
      career = career.trim();
      degree = degree.trim();
      this.talentDetailService.updateEducationalExperienceForCurrentTalent(this.id, this.id, educationalInstitute, career, degree, startDate, endDate, isCurrentlyStudying);
    }
  }
}
