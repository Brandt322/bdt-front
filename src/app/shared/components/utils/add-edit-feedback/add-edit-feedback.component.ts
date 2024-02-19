import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-feedback',
  templateUrl: './add-edit-feedback.component.html',
  styleUrls: ['./add-edit-feedback.component.css']
})
export class AddEditFeedbackComponent implements OnInit {

  @Input() main_title!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() modal_id!: string;
  @Input() modal_add_title!: string;
  @Input() modal_add_description!: string;
  @Input() has_image!: boolean;
  @Input() number_items!: number;
  @Input() type!: string;

  modalTitle: string = '';
  modalDescription: string = '';

  ngOnInit(): void {
  }

  setAddModalTitle() {
    this.modalTitle = this.modal_add_title;
    this.modalDescription = this.modal_add_description;
  }
}
