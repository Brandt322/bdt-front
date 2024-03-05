import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { initModals } from 'flowbite';
import { LanguageResponse } from 'src/app/shared/models/interfaces/language.interface';

@Component({
  selector: 'app-add-edit-languages',
  templateUrl: './add-edit-languages.component.html',
  styleUrls: ['./add-edit-languages.component.css']
})
export class AddEditLanguagesComponent implements OnInit, OnChanges {

  @Input() main_title!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() modal_id!: string;
  @Input() modal_add_title!: string;
  @Input() modal_add_description!: string;
  @Input() modal_edit_title!: string;
  @Input() modal_edit_description!: string;
  @Input() has_image!: boolean;
  @Input() type!: string;
  @Input() languagesList!: LanguageResponse[];

  modalTitle: string = '';
  modalDescription: string = '';

  addModalId!: string;
  editModalId: string[] = [];

  ngOnInit(): void {
    // console.log('languagesList length:', this.languagesList.length); // Añade esta línea

    // this.addModalId = this.modal_id + '-add';
    // console.log('addModalId:', this.addModalId);

    // for (let i = 0; i < this.languagesList.length; i++) {
    //   this.editModalId[i] = this.modal_id + '-edit-' + i;
    //   console.log('editModalId[' + i + ']:', this.editModalId[i]);
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['languagesList'] && changes['languagesList'].currentValue) {
      this.addModalId = this.modal_id + '-add';
      // console.log('addModalId:', this.addModalId);

      for (let i = 0; i < this.languagesList.length; i++) {
        this.editModalId[i] = this.modal_id + '-edit-' + i;
        // console.log('editModalId[' + i + ']:', this.editModalId[i]);
      }
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

  editLanguage(i: number) {

    if (!this.editModalId[i]) {
      this.editModalId[i] = this.modal_id + '-edit-' + i;
    }

    this.setEditModalTitle();
    // console.log('Id:', i, 'moda_Id' + this.editModalId[i]);
  }

}
