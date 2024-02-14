import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-edit-attr',
  templateUrl: './add-edit-attr.component.html',
})
export class AddEditAttrComponent {
  @Input() main_title!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() modal_id!: string;
  @Input() modal_add_title!: string;
  @Input() modal_add_description!: string;
  @Input() modal_edit_title!: string;
  @Input() modal_edit_description!: string;
  @Input() has_image!: boolean;
  @Input() number_items!: number;
  @Input() type!: string;

  modalTitle: string = '';
  modalDescription: string = '';

  setAddModalTitle() {
    this.modalTitle = this.modal_add_title;
    this.modalDescription = this.modal_add_description;
  }

  setEditModalTitle() {
    this.modalTitle = this.modal_edit_title;
    this.modalDescription = this.modal_edit_description;
  }
}
