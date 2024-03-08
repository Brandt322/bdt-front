import { formatDate } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initFlowbite, initModals } from 'flowbite';
import { SharedDataService } from 'src/app/shared/components/services/shared-data-service.service';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';

@Component({
  selector: 'app-edit-work-experiences-form',
  templateUrl: './edit-work-experiences-form.component.html'
})
export class EditWorkExperiencesFormComponent implements OnInit, AfterViewInit {
  @Input() index!: number;
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

  constructor(private data: SharedDataService, private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      initFlowbite()
      initModals();
    })
    console.log(this.modal_id)
  }

  ngOnInit(): void {
    // console.log(this.modal_id);
    // this.modal_id = 'edit-work-experience-modal-' + this.index;
    this.formBuild();
    console.log(this.modal_id)
    console.log(this.workExperience)
  }

  formBuild() {
    this.workExperienceForm = this.fb.group({
      company: [this.workExperience.company, Validators.required],
      position: [this.workExperience.position, Validators.required],
      startDate: [this.workExperience.startDate, Validators.required],
      endDate: [this.workExperience.endDate, Validators.required],
      isCurrentlyWorking: [this.isToday(this.workExperience.endDate)],
      isCompanyFractal: [this.isCompanyFractal]
    });
  }

  isToday(date: any): boolean {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
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
