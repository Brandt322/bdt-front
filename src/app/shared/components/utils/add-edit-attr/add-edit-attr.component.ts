import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { initModals } from 'flowbite';
import { EducationalExperienceResponse } from 'src/app/shared/models/interfaces/educationalExperience.interface';
import { WorkExperienceResponse } from 'src/app/shared/models/interfaces/workExperience.interface';

@Component({
  selector: 'app-add-edit-attr',
  templateUrl: './add-edit-attr.component.html',
})
export class AddEditAttrComponent implements OnInit, OnChanges {
  @Input() main_title!: string;
  // @Input() title!: string;
  // @Input() description!: string;
  @Input() modal_id!: string;
  @Input() modal_add_title!: string;
  @Input() modal_add_description!: string;
  @Input() modal_edit_title!: string;
  @Input() modal_edit_description!: string;
  @Input() has_image!: boolean;
  @Input() educationList: EducationalExperienceResponse[] = [];
  @Input() workList: WorkExperienceResponse[] = [];
  @Input() type!: string;
  modalTitle: string = '';
  modalDescription: string = '';

  addModalId!: string;
  editWorkModalId: string[] = [];
  editEducationalModalId: string[] = [];

  ngOnInit() {
    // this.addModalId = this.modal_id + '-add';
    // this.editModalId = this.modal_id + '-edit';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['educationList'] && changes['educationList'].currentValue) || (changes['workList'] && changes['workList'].currentValue)) {
      this.addModalId = this.modal_id + '-add';
      for (let i = 0; i < this.workList.length; i++) {
        this.editWorkModalId[i] = this.modal_id + '-edit-' + i;
      }

      for (let i = 0; i < this.educationList.length; i++) {
        this.editEducationalModalId[i] = this.modal_id + '-edit-' + i;
      }
      // Espera un ciclo de detección de cambios antes de inicializar los modals
      setTimeout(() => initModals(), 0);
    }
  }

  setAddModalTitle() {
    this.modalTitle = this.modal_add_title;
    this.modalDescription = this.modal_add_description;
  }

  setEditModalTitle() {
    this.modalTitle = this.modal_edit_title;
    this.modalDescription = this.modal_edit_description;
  }

  editWorkOrEducational(i: number) {
    if (this.type === 'exp') {
      if (!this.editWorkModalId[i]) {
        this.editWorkModalId[i] = this.modal_id + '-edit-work-' + i;
      }
    }

    if (this.type === 'edu') {
      if (!this.editEducationalModalId[i]) {
        this.editEducationalModalId[i] = this.modal_id + '-edit-education-' + i;
      }
    }

    this.setEditModalTitle();
    // console.log('Id:', i, 'moda_Id' + (this.type === 'exp' ? this.editWorkModalId[i] : this.editEducationModalId[i]));
  }

  get companyWork() {
    return this.workList?.map(experience => experience.company).join(' ') || '';
  }

  get workExperienceDescription() {
    return this.workList?.map(experience => {
      const startDate = new Date(experience.startDate);
      const endDate = new Date(experience.endDate);
      const years = endDate.getFullYear() - startDate.getFullYear();

      if (years === 0) {
        return `${experience.position} ${startDate.getFullYear()} - Hasta la actualidad`;
      }

      if (years === 1) {
        return `${experience.position} ${startDate.getFullYear()}-${endDate.getFullYear()} 1 año`;
      }

      return `${experience.position} ${startDate.getFullYear()}-${endDate.getFullYear()} ${years} años`;
    }).join(' ') || '';
  }

  get educationaInstitute() {
    return this.educationList?.map(experience => experience.educationalInstitute).join(' ') || '';
  }

  get educationalExperienceDescription() {
    const currentYear = new Date().getFullYear();
    return this.educationList?.map(experience => {
      const startDate = new Date(experience.startDate);
      const endDate = new Date(experience.endDate);

      if (endDate.getFullYear() === currentYear) {
        return `${experience.degree} ${startDate.getFullYear()} - En curso`;
      }

      return `${experience.degree} ${startDate.getFullYear()}-${endDate.getFullYear()}`;
    }).join(' ') || '';
  }
}
